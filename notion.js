const{ Client, LogLevel } = require('@notionhq/client');
const { text } = require('express');
const { get } = require('express/lib/response');

const notion = new Client ({ auth: process.env.NOTION_API_KEY })



async function getDatabase(){

    const database = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID, }) 
    console.log(response)
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
module.exports = {createThought}