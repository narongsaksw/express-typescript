import { Express, Request, Response } from 'express'
import { 
    createProductHandler, 
    deleteProductHandler, 
    getProductHandler, 
    updateProductHandler
} from './controllers/product.controller'
import { 
    createUserSessionHandler, 
    deleteSessionHandler, 
    getUserSessionHandler
} from './controllers/session.controller'
import { createUserHandler } from './controllers/user.controller'
import requireUser from './middleware/requireUser'
import validateResource from './middleware/validateResource'
import { 
    createProductSchema, 
    deleteProductSchema, 
    getProductSchema, 
    updateProductSchema
} from './schema/product.schema'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200)
    })
    
    //user
    app.post('/api/users', validateResource(createUserSchema),createUserHandler)
    
    //session
    app.post('/api/sessions', validateResource(createSessionSchema),createUserSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteSessionHandler)

    //product
    app.post(
        '/api/products', 
        [requireUser, validateResource(createProductSchema)], 
        createProductHandler
    )
    app.put(
        '/api/products/:productId', 
        [requireUser, validateResource(updateProductSchema)], 
        updateProductHandler
    )
    app.get(
        '/api/products/:productId', 
        [validateResource(getProductSchema)], 
        getProductHandler
    )
    app.delete(
        '/api/products/:productId', 
        [requireUser, validateResource(deleteProductSchema)], 
        deleteProductHandler
    )

}

export default routes