```mermaid
sequenceDiagram

    %%{init: {'theme': 'base', 'themeVariables': { 
        'primaryColor': '#000000',  // Darker background for boxes
        'edgeColor': '#3e3e3e',      // White edges for better visibility
        'nodeTextColor': '#3e3e3e',  // White text for better contrast
        'signalColor': '#00ff00',    // Bright green signals
        'background': '#1a1a1a'       // Dark background for the entire diagram
    }}}%%
    
    box rgb(50, 50, 50) Frontend Application
        participant SingleProductPage
        participant serverAction
    end
    
    box rgb(71, 71, 71) Backend Services
        participant productsController
        participant passportJwtStrategy
        participant productsService
        participant prismaService
    end
    
    SingleProductPage->>serverAction: getProduct(prodId)
    activate serverAction

    serverAction->>productsController: getProduct(prodId)
    activate productsController
    productsController->> passportJwtStrategy:.
    activate passportJwtStrategy
    passportJwtStrategy->>passportJwtStrategy: validate token
    passportJwtStrategy-->>passportJwtStrategy: attach token payload to req
    deactivate passportJwtStrategy

    productsController->>productsService: getProduct(prodId)
    activate productsService
    productsService->>prismaService: findUniqueOrThrow()
    activate prismaService
    prismaService-->>productsService: product details
    deactivate productsService
    productsService-->>productsController: products details

    alt valid token
        productsController-->>serverAction: 200 OK
    else product not found
        productsController-->>serverAction: 404 Not Found
    else invalid token
        productsController-->>serverAction: 401 Unauthorized
    else Exception Occurred
        productsController-->>serverAction: 500 Internal Server Error
    end
    deactivate productsController

    serverAction-->>SingleProductPage: response (product details)
    deactivate serverAction
```
