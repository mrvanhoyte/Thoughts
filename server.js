require('dotenv').config()

const express = require("express")
const res = require('express/lib/response')
const notion =require('./notion')
const { createThought } = require('./notion')

const app = express()
app.set('views','./views')
app.set("view engine", "ejs") 
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//renders the page
app.get("/", (req, res)=>{
    res.render("index")
})


app.post("/create-thought", async (req, res) => {
    const { title } = req.body
  
    await createThought({
      title
    }),
  
    res.redirect("/")
  })

app.listen(process.env.PORT)
