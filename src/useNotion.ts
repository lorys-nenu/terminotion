// This hook will perform the API call to Notion and return the data
// It will use notionClient to perform the API call
// It takes the token as an argument

import {useEffect, useState} from 'react';
import { Client } from "@notionhq/client";

type Props = {
  token: string;
  dbId: string;
}

const recreatePageHiearchy = (data: any) => {
  if (!data) {
    return null
  }

  const pageHiearchy: any[] = []
  const subPages: any[] = []
  data.forEach((item: any) => {
    const parent = item.properties['Parent item'].relation[0] ? item.properties['Parent item'].relation[0].id : null
    if (!parent) {
      const page = {
        id: item.id,
        uniqueId: item.properties.ID.unique_id.prefix + "-" +  item.properties.ID.unique_id.number,
        title: item.properties.Name.title[0].plain_text,
        status: item.properties.Status.select.name,
        children: [],
      }
      pageHiearchy.push(page)
    }

    subPages.push({
      parent: parent,
      id: item.id,
      uniqueId: item.properties.ID.unique_id.prefix + "-" + item.properties.ID.unique_id.number,
      title: item.properties.Name.title[0].plain_text,
      status: item.properties.Status.select.name,
    })
  })

  subPages.forEach((item: any) => {
    pageHiearchy.find((page: any) => {
      if (page.id === item.parent) {
        page.children.push(item)
      }
    })
  })

  return pageHiearchy
}

const useNotion = ({token, dbId}: Props) => {
  // Initializing a client
  const notion = new Client({
    auth: token,
  })

  // Get the data from Notion
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    setLoading(true)
    const response = await notion.databases.query({
      database_id: dbId,
    })
    setData(response.results)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [token, dbId])

  return {
    data: recreatePageHiearchy(data),
    refresh: fetchData,
    loading: isLoading,
  }
}

export default useNotion;
