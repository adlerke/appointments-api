import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tempDir = path.resolve(__dirname, '..','..', 'temp')

export default {

    diectory: tempDir,
    
    storage : multer.diskStorage({
        destination : tempDir,
        filename(request, file, callback){
            const hash = crypto.randomBytes(10).toString('hex')
            const fileName = `${hash}-${file.originalname}`;

            return callback(null, fileName)
        }

    })

}