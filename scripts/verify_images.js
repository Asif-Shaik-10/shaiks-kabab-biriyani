import { menuItems } from '../src/data/menuData.js';
import https from 'https';

console.log('Verifying ' + menuItems.length + ' images...');

const checkUrl = (url) => {
    return new Promise((resolve) => {
        if (!url || !url.startsWith('https')) {
            resolve({ url, status: 'Invalid Protocol/Local' });
            return;
        }
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: 'Error: ' + e.message });
        });
    });
};

const verify = async () => {
    const results = await Promise.all(menuItems.map(item => checkUrl(item.image)));
    const failures = results.filter(r => r.status !== 200);

    if (failures.length === 0) {
        console.log('All images verified successfully!');
    } else {
        console.error('Found ' + failures.length + ' broken images:');
        failures.forEach(f => console.error(`${f.status} - ${f.url}`));
    }
};

verify();
