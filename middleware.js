import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(NextRequest) {
//   let url = NextRequest.nextUrl.clone()

//     const routes = ['about', 'projects', 'experience', 'contact']

//     routes.map((route) => {
//         if(url.pathname.includes(route)) {
//             console.log('route matched', route);
//             let update = `/#${route}`;
//             console.log('update url', update);
//             return NextResponse.rewrite(new URL(update), url)
//         } else {
//             return NextResponse.next();
//         }
//     })
}