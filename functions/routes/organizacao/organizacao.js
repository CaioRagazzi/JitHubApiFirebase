const router = require('express').Router()
const cors = require('cors')
const queries = require('../data/queries/organizacao')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifyToken = require('../jwt/jsontoken')

router.all('*', cors())