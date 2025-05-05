import { Controller, Get, Query } from '@nestjs/common';

@Controller('search')  // Base route: /search
export class SearchController {

    /**
     * Searches for blog posts based on a keyword.
     * 
     * Route: GET /search
     * 
     * Description:
     * Calls the Flask backend search endpoint with a keyword query to fetch 
     * matching blog posts. This enables keyword-based search functionality.
     * 
     * Flask API it calls:
     * GET http://localhost:5000/mongo/blog/search?keyword={keyword}
     * 
     * Query Params:
     * - keyword (string, required): The search term used to look up blog posts.
     * 
     * Example Request:
     * GET /search?keyword=machine%20learning
     * 
     * Returns:
     * - JSON array of blog posts matching the keyword.
     * - Error message if fetching fails.
     */
    @Get()
    async findAll(@Query('keyword') keyword: string): Promise<any> {

        const url = `http://localhost:5000/mongo/blog/search?keyword=${encodeURIComponent(keyword)}`;
        
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
