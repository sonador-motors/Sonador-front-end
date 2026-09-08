import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function POST(req: Request) {
    const {token, paths} = await req.json();
    
    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json({error: "Invalid token"}, {status: 401});
    }
    
    if (!paths || !Array.isArray(paths)) {
        return NextResponse.json({error: "Paths required"}, {status: 400});
    }
    
    for (const path of paths) {
        revalidatePath(path);
    }
    
    return NextResponse.json({revalidated: true, paths});
}
