# API Documentation - TurboX Backend

## Configuração Base
- Base URL: `http://localhost:3001/api`
- Content-Type: `application/json`
- Autenticação: Bearer Token (quando aplicável)

## Endpoints de Carros

### 1. GET /cars
**Descrição**: Buscar todos os carros com filtros opcionais

**Query Parameters**:
- `brand` (string, opcional): Filtrar por marca específica
- `category` (string, opcional): Filtrar por categoria (esportivo, supercar, hypercar, muscle)
- `minPrice` (number, opcional): Preço mínimo
- `maxPrice` (number, opcional): Preço máximo  
- `search` (string, opcional): Buscar em modelo, marca ou engine
- `sortBy` (string, opcional): Ordenar por (power, acceleration, year, price, topSpeed, brand)

**Exemplo de Requisição**:
```
GET /cars?brand=BMW&category=supercar&sortBy=power
```

**Resposta de Sucesso (200)**:
```json
[
  {
    "id": 1,
    "brand": "BMW",
    "model": "M3 Competition",
    "year": 2023,
    "image": "🚗",
    "power": 510,
    "torque": 650,
    "acceleration": 3.8,
    "price": 650000,
    "category": "supercar",
    "engine": "3.0L I6 Twin-Turbo",
    "drivetrain": "RWD",
    "transmission": "Automático",
    "topSpeed": 290,
    "description": "Sedã esportivo de alta performance com tecnologia de F1."
  }
]
```

### 2. GET /cars/brand/:brand
**Descrição**: Buscar carros por marca específica

**Parâmetros**:
- `brand` (string): Nome da marca (ex: "BMW", "Toyota")

**Exemplo de Requisição**:
```
GET /cars/brand/BMW
```

### 3. GET /cars/brands
**Descrição**: Listar todas as marcas disponíveis

**Resposta de Sucesso (200)**:
```json
[
  "Audi",
  "BMW", 
  "Chevrolet",
  "Ferrari",
  "Ford",
  "Honda",
  "Hyundai",
  "Lamborghini",
  "McLaren",
  "Mercedes-AMG",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Subaru",
  "Toyota",
  "Volkswagen"
]
```

### 4. GET /cars/categories
**Descrição**: Listar todas as categorias disponíveis

**Resposta de Sucesso (200)**:
```json
[
  "esportivo",
  "hypercar", 
  "muscle",
  "supercar"
]
```

### 5. GET /cars/:id
**Descrição**: Buscar carro por ID específico

**Parâmetros**:
- `id` (number): ID único do carro

## Tratamento de Erros

### 400 - Bad Request
```json
{
  "error": "Bad Request",
  "message": "Parâmetros inválidos"
}
```

### 404 - Not Found  
```json
{
  "error": "Not Found",
  "message": "Carro não encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal Server Error", 
  "message": "Erro interno do servidor"
}
```

## Estrutura do Modelo Car

```javascript
{
  id: number,              // ID único
  brand: string,           // Marca do carro
  model: string,           // Modelo do carro
  year: number,            // Ano de fabricação
  image: string,           // Emoji ou URL da imagem
  power: number,           // Potência em CV
  torque: number,          // Torque em Nm
  acceleration: number,    // 0-100km/h em segundos
  price: number,           // Preço em reais
  category: string,        // Categoria (esportivo, supercar, etc)
  engine: string,          // Especificação do motor
  drivetrain: string,      // Tipo de tração (FWD, RWD, AWD)
  transmission: string,    // Tipo de transmissão
  topSpeed: number,        // Velocidade máxima em km/h
  description: string      // Descrição detalhada
}
```

## Implementação de Referência (Node.js/Express)

```javascript
// GET /cars
app.get('/cars', async (req, res) => {
  try {
    const { brand, category, minPrice, maxPrice, search, sortBy } = req.query;
    
    let query = {};
    
    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    if (search) {
      query.$or = [
        { model: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { engine: { $regex: search, $options: 'i' } }
      ];
    }
    
    let cars = await Car.find(query);
    
    // Aplicar ordenação
    if (sortBy) {
      const sortOptions = {
        power: { power: -1 },
        acceleration: { acceleration: 1 },
        year: { year: -1 },
        price: { price: -1 },
        topSpeed: { topSpeed: -1 },
        brand: { brand: 1 }
      };
      
      if (sortOptions[sortBy]) {
        cars = await Car.find(query).sort(sortOptions[sortBy]);
      }
    }
    
    res.json(cars);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
});
```
