import express from 'express';
import { verifyTokenhltl } from '../controllers/authControllerhltl.js';
import { getReportshltl, downloadReporthltl } from '../controllers/reporteControllerhltl.js';

const routes = express.Router()
  .get('/stats', verifyTokenhltl, getReportshltl)
  .get('/download-pdf', downloadReporthltl);

export { routes as reporteRouterhltl };