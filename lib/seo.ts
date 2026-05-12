import axiosServer from "./axiosServer";

export async function getseo(slug:string) {
    try {

        const {data} = await axiosServer.get(`/seo/${slug}`);

        if(!data.success){
            return null;
        }

        return data.data;
        
    } catch (error) {
        console.log("SEO API error:",error);
        return null;
    }
}