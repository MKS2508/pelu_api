import mongoose, { mongo } from 'mongoose'
import { logInfo, log, logBold, logBoldBG } from './logging'
import config from "./config";

mongoose.set('useFindAndModify', false)

    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(db => log(logInfo + logBold(' Conectado a BD MongoDB 💾 con version: ') + logBoldBG(db.version)))
    .catch(error => console.log(error));