import { Controller, Get, Param } from '@nestjs/common';

@Controller('section')  // Base route: /section
export class SectionController {
    
    //  Fetch all section data in a category
    @Get(':category')
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

   // Fetch data for explore page 
   @Get('explore')
   async explore(): Promise<any> {
       const url = `http://localhost:5000/mongo/section/explore`;

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
