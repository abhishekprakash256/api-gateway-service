import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('section')  // Base route: /section
export class SectionController {

    /**
     * Fetches the 'explore' section data.
     * 
     * Route: GET /section/explore
     * 
     * Description:
     * Calls the Flask backend at `/mongo/blog/section/explore` to retrieve 
     * a general list of articles or data meant for the explore section.
     * 
     * Flask API it calls:
     * GET http://localhost:5000/mongo/blog/section/explore
     * 
     * Example Request:
     * GET /section/explore
     * 
     * Returns:
     * - JSON object containing the explore data.
     * - Error message if fetching fails.
     */
    @Get('/explore')
    async explore() : Promise<any> {

        const url = `http://localhost:5000/mongo/blog/section/explore`;

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


    /**
     * Fetches paginated articles within a specific category.
     * 
     * Route: GET /section/:category
     * 
     * Description:
     * Calls the Flask backend to retrieve articles under a given category, 
     * supporting pagination with `page` and `limit` query parameters.
     * 
     * Flask API it calls:
     * GET http://localhost:5000/mongo/blog/section/:category?page={page}&limit={limit}
     * 
     * Params:
     * - category (string, required): The category name (path param).
     * 
     * Query Params:
     * - page (number, optional, default = 1): Page number.
     * - limit (number, optional, default = 15): Number of items per page.
     * 
     * Example Request:
     * GET /section/technology?page=2&limit=10
     * 
     * Returns:
     * - JSON array of articles within the specified category.
     * - Error message if fetching fails.
     */
    @Get(':category')
    async findAll(
        @Param('category') category: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 15
    ): Promise<any> {

        const url = `http://localhost:5000/mongo/blog/section/${category}?page=${page}&limit=${limit}`;
        
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


    /**
     * Fetches a specific article within a category.
     * 
     * Route: GET /section/:category/article/:articleName
     * 
     * Description:
     * Calls the Flask backend to retrieve a single article by its name within 
     * a given category.
     * 
     * Flask API it calls:
     * GET http://localhost:5000/mongo/blog/section/:category/article/:articleName
     * 
     * Params:
     * - category (string, required): The category name (path param).
     * - articleName (string, required): The article name (path param).
     * 
     * Example Request:
     * GET /section/technology/article/how-to-code
     * 
     * Returns:
     * - JSON object containing the article data.
     * - Error message if fetching fails.
     */
    @Get(':category/article/:articleName')
    async findArticle(
        @Param('category') category: string, 
        @Param('articleName') articleName: string
    ): Promise<any> {

        const url = `http://localhost:5000/mongo/blog/section/${category}/article/${articleName}`;

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
}
