export default function ({ req, res }) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        req.headers['x-forwarded-proto'] = 'https';
    }
}
