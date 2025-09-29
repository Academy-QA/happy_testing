import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Crear usuario de prueba
    const plainPassword = 'nutriapp123';
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const user = await prisma.user.upsert({
        where: { email: 'test@nutriapp.com' },
        update: {},
        create: {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@nutriapp.com',
            nationality: 'Chile',
            phone: '123456789',
            password: passwordHash,
        },
    });

    // Crear platillos de ejemplo
    // Asociar los platillos al usuario de prueba
    const dishesData = [
        {
            name: 'Ensalada de Quinoa y Aguacate',
            description: 'Una ensalada refrescante y nutritiva con quinoa, aguacate, tomate cherry y un aderezo ligero de limón.',
            quickPrep: true,
            prepTime: 15,
            cookTime: 20,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Cocina la quinoa según las instrucciones del paquete.',
                'Corta el aguacate y los tomates cherry.',
                'Mezcla todos los ingredientes en un bol.',
                'Agrega el aderezo de limón y sirve.'
            ],
            calories: 350,
            userId: user.id,
        },
        {
            name: 'Tacos de Lentejas',
            description: 'Alternativa vegetariana y rica en fibra. Lentejas sazonadas y tortillas de maíz con tus toppings favoritos.',
            quickPrep: true,
            prepTime: 10,
            cookTime: 15,
            imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Cocina las lentejas en agua con sal.',
                'Sazona las lentejas con especias.',
                'Calienta las tortillas de maíz.',
                'Rellena las tortillas con las lentejas y toppings.'
            ],
            calories: 280,
            userId: user.id,
        },
        {
            name: 'Sopa de Verduras de Temporada',
            description: 'Receta reconfortante llena de vitaminas. Las verduras frescas se cocinan en un caldo ligero.',
            quickPrep: false,
            prepTime: 10,
            cookTime: 30,
            imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Corta las verduras en trozos pequeños.',
                'Sofríe las verduras en una olla.',
                'Agrega caldo y cocina a fuego lento.',
                'Sirve caliente.'
            ],
            calories: 180,
            userId: user.id,
        },
        {
            name: 'Bowl de Avena con Frutas',
            description: 'Un desayuno energético y completo. Avena cocida lentamente y decorada con frutas frescas, plátano y fresas.',
            quickPrep: true,
            prepTime: 5,
            cookTime: 10,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Cocina la avena en leche o agua.',
                'Corta las frutas en rodajas.',
                'Sirve la avena en un bowl y decora con frutas.',
                'Agrega miel si lo deseas.'
            ],
            calories: 260,
            userId: user.id,
        },
        {
            name: 'Pasta Integral con Pesto de Espinaca',
            description: 'Pasta integral acompañada de un pesto fresco de espinaca y nuez, ideal para una comida rápida y saludable.',
            quickPrep: true,
            prepTime: 10,
            cookTime: 15,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Cocina la pasta integral según las instrucciones.',
                'Prepara el pesto con espinaca, nuez, ajo y aceite de oliva.',
                'Mezcla la pasta con el pesto y sirve caliente.'
            ],
            calories: 390,
            userId: user.id,
        },
        {
            name: 'Wrap de Pollo y Vegetales',
            description: 'Wrap de tortilla integral relleno de pollo a la plancha, lechuga, tomate y aderezo ligero.',
            quickPrep: true,
            prepTime: 8,
            cookTime: 10,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Cocina el pollo a la plancha y córtalo en tiras.',
                'Coloca el pollo y los vegetales en la tortilla.',
                'Agrega aderezo y enrolla el wrap.'
            ],
            calories: 320,
            userId: user.id,
        },
        {
            name: 'Curry de Garbanzos',
            description: 'Curry vegetariano con garbanzos, tomate, cebolla y especias, servido con arroz basmati.',
            quickPrep: false,
            prepTime: 15,
            cookTime: 25,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Sofríe cebolla y tomate en una olla.',
                'Agrega garbanzos y especias.',
                'Cocina a fuego lento y sirve con arroz.'
            ],
            calories: 410,
            userId: user.id,
        },
        {
            name: 'Pizza Saludable de Vegetales',
            description: 'Base de pizza integral cubierta con salsa de tomate, vegetales frescos y queso bajo en grasa.',
            quickPrep: false,
            prepTime: 20,
            cookTime: 20,
            imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
            steps: [
                'Prepara la base de pizza integral.',
                'Agrega salsa de tomate y vegetales.',
                'Hornea hasta que el queso se derrita.'
            ],
            calories: 370,
            userId: user.id,
        },
    ];

    await prisma.dish.createMany({
        data: dishesData,
        skipDuplicates: true,
    });

    console.log('Datos de ejemplo insertados correctamente.');
    console.log('Usuario de prueba:');
    console.log('Email:', user.email);
    console.log('Contraseña:', plainPassword);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
