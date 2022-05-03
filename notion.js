const{ Client, LogLevel } = require('@notionhq/client');
const { text } = require('express');
const { get } = require('express/lib/response');

const notion = new Client ({ auth: process.env.NOTION_API_KEY })



async function getDatabase(){

    const database = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID, }) 
    console.log(response)
}

function notionPropertiesById(properties) {
    return Object.values(properties).reduce((obj, property) => {
      const { id, ...rest } = property
      return { ...obj, [id]: rest }
    }, {})
  }

function createThought({title}){
    notion.pages.create(
        {

        parent: {database_id: process.env.NOTION_DATABASE_ID,},
        properties: {
                    [process.env.NOTION_DESCRIPTION_ID]: {title: [{type: 'text',text: {content: title},},],},
                    
        },
    })
}


async function getThoughts() {
    const notionPages = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    })
  
    return notionPages.results.map(fromNotionObject)
  }
  
function fromNotionObject(notionPage) {
    const propertiesById = notionPropertiesById(notionPage.properties)
  
    return {
      id: notionPage.id,
      title: propertiesById[process.env.NOTION_DESCRIPTION_ID].title[0].plain_text
    }
}



module.exports = {
    createThought,
    getThoughts
}