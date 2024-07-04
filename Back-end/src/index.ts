const { Application } = require('express');

// import express from 'express'
const express = require('express');

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(3000,()=>{console.log('Server listening to 3000')})