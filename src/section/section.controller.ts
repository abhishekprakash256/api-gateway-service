import { Controller, Get, Param } from '@nestjs/common';

@Controller('section')  // Base route: /section
export class SectionController {
    @Get(':category')  // ✅ Corrected to match /section/:category
    async findAll(@Param('category') category: string): Promise<any> {
        const url = `http://localhost:5000/mongo/section/${category}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return { error: 'Failed to fetch data', details: error.message };
        }
    }
}
