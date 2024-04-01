import rateLimit from 'express-rate-limit';

const createRateLimiter = (maxRequests: number, windowMs: number) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    message: 'Too many requests, please try again later.'
  });
};

export const rateLimiter = createRateLimiter(10, 5 * 60 * 1000); // 10 requests per 5 minutes
