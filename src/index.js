import app from './app';
import './database'
import { logInfo, log, logBold, logBoldBG } from './logging'
import date from 'date-and-time';


app.listen(app.get("port"));

log(logInfo + logBold(' Servidor Iniciado 🌐'));
log(logInfo + logBold(' Escuchando 📡 en el puerto : ') + logBoldBG(app.get("port")));
const now = new Date();

const pattern = date.compile('YYYY/MM/DD HH:mm:ss');


date.format(now, pattern);
log(logInfo + logBoldBG(' ' + date.format(now, pattern)))