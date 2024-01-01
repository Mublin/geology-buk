const express = require('express')
const knex = require('knex')
const bcrypt = require('bcryptjs')
const { generateToken, isAuth } = require('../utils')
const db = knex(require('../knexfile'))


const userRoute = express.Router()

userRoute.post('/signin', async (req, res)=>{
    const { registrationNumber, password} = req.body
    try {
        const user = await db('hash').select('*').where('reg_number', '=', registrationNumber)
        // console.log(user, registrationNumber)
        if (user[0]) {
           const correct = await bcrypt.compare(password, user[0].sirri);
           if (correct) {
                const user = await db('users').select('*').where('reg_number', '=', registrationNumber)
                return res.status(201).send({
                    name: user[0].name,
                    email: user[0].email,
                    registrationNumber,
                    id: user[0].id,
                    isStudent: user[0].student,
                    isAdmin: user[0].admin,
                    tokened: generateToken({
                        name: user[0].name,
                        email: user[0].email,
                        registrationNumber,
                        id: user[0].id,
                        isStudent: user[0].student,
                        isAdmin: user[0].admin
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
        const { registrationNumber, password, email} = req.body
        const hashedPassword = await bcrypt.hash(password, 13); // Adjust the salt rounds as needed
        let authU;
        await db.transaction(async (trx)=>{
            const auth = await db('users').select('*').where('reg_number', '=', registrationNumber)
            if (auth[0]) {
                authU = auth[0]
                if (authU.email) {
                   throw Error('user exist') 
                }
                await trx('users').update({
                    email
                }).where('reg_number', '=', registrationNumber)
                await trx('hash').insert({
                    "reg_number": registrationNumber,
                    sirri: hashedPassword
                })
            } else {
                throw Error({message: "Invalid user"})
            }
        })
        return res.status(201).send({
            email,
            registrationNumber,
            name: authU.name,
            id: authU.id,
            isStudent: authU.student,
            isAdmin: authU.admin,
            tokened: generateToken({email, registrationNumber, authU, id, isStudent, isAdmin})
        })
    } catch (error) {
        res.status(401).send({message: "User not found or already exist"})
    }
})
userRoute.get('/:reg', isAuth, async (req, res)=>{
    const {reg} = req.params
    try {
        const user = await db('users').select('*').where('id', '=', reg)
        if (user.length){
            return res.status(201).send({
                registrationNumber: user[0].reg_number,
                email: user[0].email,
                name: user[0].name,
                isStudent: user[0].student,
                isAdmin: user[0].admin
            })
        }else{
            return res.status(401).send({message: "Invalid credentials"})
        }
    } catch (error) {
        return res.status(401).send({message: "Invalid user"})
    }
})
userRoute.put('/changepassword/:reg', isAuth, async (req, res)=>{
    const {registrationNumber, password, newPassword} = req.body
    try {
        const user = await db('hash').select('*').where('reg_number', '=', registrationNumber)
        if (user.length){
           const correct = await bcrypt.compare(password, user[0].sirri);
           if (correct) {
            const hashedPassword = await bcrypt.hash(newPassword, 13);
            await db('hash').update({
                sirri: hashedPassword
            }).where('reg_number', '=', registrationNumber)
            return res.status(201).send({
                message: "Password is changed successfully"
            })
           } else {
            return res.status(401).send({message: 'Invalid password'})
           }
        }else{
            return res.status(401).send({message: "Invalid credentials"})
        }
    } catch (error) {
        return res.status(401).send({message: "Invalid user"})
    }
})

userRoute.put('/:id', isAuth, async (req, res)=>{
    const {id} = req.params
    const { email } = req.body
    try {
        const user = await db('users').select('*').where('id', '=', id)
        if (user.length){
           await db(`users`).update({
            email
           }).where(`id`, '=', id)
           return res.status(201).send({
            message: "E-mail changed successfully"
        })
        }else{
            return res.status(401).send({message: "Invalid credentials"})
        }
    } catch (error) {
        return res.status(401).send({message: "unable to change e-mail"})
    }
})
module.exports = userRoute