export {default} from 'next-auth/middleware'

export const config = {
    matcher: ["/rental", "/mycart", "/myrental", "/rental/manage"]
};