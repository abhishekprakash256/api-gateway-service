import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('section')  // Base route: /section
export class SectionController {
    

    
    // Fetch paginated articles in a category (supports ?page=1&limit=15)
    @Get(':category')
    async findAll(
        @Param('category') category: string,
        @Query('page') page: number = 1,  // Default to page 1
        @Query('limit') limit: number = 15  // Default to limit 15
    ): Promise<any> {
        const url = `http://localhost:5000/mongo/section/${category}?page=${page}&limit=${limit}`;
        
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



    // Fetch a specific article in a category
    @Get(':category/article/:articleName')
    async findArticle(
        @Param('category') category: string, 
        @Param('articleName') articleName: string
    ): Promise<any> {
        const url = `http://localhost:5000/mongo/section/${category}/article/${articleName}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return { error: 'Failed to fetch article', details: error.message };
        }
    }



    //Fetch explore data with limit parameter (supports ?limit=15)
    @Get('/explore')
    async explore(@Query('limit') limit: number = 15): Promise<any> {
        const url = `http://localhost:5000/mongo/section/explore?limit=${limit}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return { error: 'Failed to fetch explore data', details: error.message };
        }
    }
}
