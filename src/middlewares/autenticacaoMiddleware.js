import jwt from 'jsonwebtoken';

const SEGREDO_JWT = "seu_segredo_super_secreto_123";

export const autenticacaoMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodificado = jwt.verify(token, SEGREDO_JWT);
    req.usuarioId = decodificado.id;
    req.usuarioEmail = decodificado.email;
    return next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido" });
  }
};

export { SEGREDO_JWT };
