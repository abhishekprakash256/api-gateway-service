import { Controller , Get, Param , Query} from '@nestjs/common';

@Controller('search')
export class SearchController {
    @Get()  // ✅ Corrected to match /section/:category
    async findAll(@Query('keyword') keyword: string): Promise<any> {

        const url = `http://localhost:5000/mongo/blog/search?keyword=${encodeURIComponent(keyword)}`;;  
        
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



