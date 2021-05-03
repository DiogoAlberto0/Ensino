input = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <form method="GET" name="formulario">
        <label for="login">Login</label>
        <input type="text" name="login">

        <label for="senha">Senha:</label>
        <input type="text" name="senha">

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
`


module.exports = { input }