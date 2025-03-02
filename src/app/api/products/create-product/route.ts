
export async function POST(req: Request){
    const {name, title, description, image, video_url, tags, updated_by, created_by} = await req.json();
    console.log(name, title, description, image, video_url, tags, updated_by, created_by);
    return Response.json({msg: "hi"});
}