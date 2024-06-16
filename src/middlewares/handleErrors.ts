import { Request, Response, NextFunction } from 'express';
import Exception from '../helpers/exception';

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    return res.status((err as Exception).getStatus()).json({
      success: false,
      error: {
        message: (err as Exception).getMessage(),
        path: (err as Exception).getPath()
      }
    });
  }

  if (err && 'code' in err && (err as any).code === 'ETIMEOUT') {
    return res.status(408).json({
      success: false,
      error: {
        message: 'Connection request timeout.',
        path: 'localhost:3000'
      }
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: 'Internal Server Error',
      path: 'localhost:3000'
    }
  });
};

export default handleErrors;