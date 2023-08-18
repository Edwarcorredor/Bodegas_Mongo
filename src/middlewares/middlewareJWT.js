import { SignJWT, jwtVerify } from "jose"

const crearToken = async (req, res) => {
    const encoder = new TextEncoder();
    const jwtConstructor = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_TOKEN
            ));
    res.send(jwtConstructor);
}

const validarToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(404).send('Falta el token de autorización');
    try {
        const encoder = new TextEncoder();
        await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_TOKEN
                )
        );
        next();
    } catch (error) {
        res.status(401).send('No autorizado');
    }

}

export {
    crearToken,
    validarToken
}