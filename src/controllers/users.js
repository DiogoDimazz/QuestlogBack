const knex = require('../connection')
const bcrypt = require('bcrypt')
const signupSchema = require('../validations/signupSchema')

const testName = (name) => {
    const separatedNames = name.split(' ')
    const firstName = separatedNames[0].toLowerCase()
    if (firstName !== "dimazz" && firstName !== 'akemy') {
        return false;
    }
    return true;
}

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    const bodyFormatted = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim()
    }

    const bypass = testName(bodyFormatted.name)

    if (!bypass) { return res.status(400).json("Lamento! O site ainda não está aberto ao público. Que tal experimentar o 'modo portfólio?' :)") }

    try {

        await signupSchema.validate(bodyFormatted)

        if (password !== confirmPassword) { return res.status(400).json("As senhas não coincidem") }

        const uniqueEmail = await knex('usuarios').where({ email }).first()

        if (uniqueEmail) { return res.status(400).json('O email já existe!') }

        const hash = await bcrypt.hash(password, 10)

        const user = await knex('usuarios').insert({
            nome: bodyFormatted.name,
            email: bodyFormatted.email,
            senha: hash
        })

        if (!user) { return res.status(400).json("Cadastro não realizado") }

        return res.status(200).json(bypass)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    signup
}