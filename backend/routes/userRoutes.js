const express = require('express')
const knex = require('knex')
const bcrypt = require('bcryptjs')
const { generateToken, isAuth } = require('../utils')
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.url,
        user: process.env.usernam,
        password: process.env.password,
        database: process.env.name
    }
})

const userRoute = express.Router()

userRoute.post('/signin', async (req, res)=>{
    const { regNo, password} = req.body
    try {
        const user = await db('hash').select('*').where('reg_number', '=', regNo)
        if (user[0]) {
           const correct = await bcrypt.compare(password, user[0].sirri);
           if (correct) {
                const user = await db('users').select('*').where('reg_number', '=', regNo)
                return res.status(201).send({
                    name: user[0].name,
                    email: user[0].email,
                    regNo,
                    id: user[0].id,
                    tokened: generateToken({
                        name: user[0].name,
                        email: user[0].email,
                        regNo,
                        id: user[0].id
                    })
                })
           }else{
            throw Error('error')
           }
        } else {
            throw Error('error')
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({message: 'invalid registration number or password'})
    }
    
})

userRoute.post('/register', async (req, res)=>{
    try {
        const { regNo, password, email} = req.body
        const hashedPassword = await bcrypt.hash(password, 13); // Adjust the salt rounds as needed
        let authU;
        await db.transaction(async (trx)=>{
            const auth = await db('users').select('*').where('reg_number', '=', regNo)
            if (auth[0]) {
                authU = auth[0]
                await trx('users').update({
                    email
                }).where('reg_number', '=', regNo)
                await trx('hash').insert({
                    "reg_number": regNo,
                    sirri: hashedPassword
                })
            } else {
                throw Error({message: "Invalid user"})
            }
        })
        return res.status(201).send({
            email,
            regNo,
            name: authU.name,
            id: authU.id,
            tokened: generateToken({email, regNo, authU})
        })
    } catch (error) {
        const {message} = error
        console.log(error)
        res.status(401).send({message: "User not found"})
    }
})
userRoute.get('/:reg', isAuth, async (req, res)=>{
    const {reg} = req.params
    try {
        const user = await db('users').select('*').where('id', '=', reg)
        if (user.length){
            return res.status(201).send({
                regNo: user[0].reg_number,
                email: user[0].email,
                name: user[0].name
            })
        }else{
            return res.status(401).send({message: "Invalid credentials"})
        }
    } catch (error) {
        return res.status(401).send({message: "Invalid user"})
    }
})
module.exports = userRoute