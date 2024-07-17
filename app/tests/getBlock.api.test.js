import { check } from 'k6';
import http from 'k6/http';

const be_key = process.env.BE_KEY || ''

export const options = {
    discardResponseBodies: false,
    scenarios: {
        shared_iterations: {
            executor: 'shared-iterations',
            startTime: '0s',
            gracefulStop: '5s',
            env: { EXAMPLEVAR: 'testing' },
            tags: { example_tag: 'testing' },
            vus: 10,
            iterations: 1500,
            maxDuration: '50s',
            exec: 'apiTest',
        },
        per_vu_scenario: {
            executor: "per-vu-iterations",
            vus: 10,
            iterations: 100,
            startTime: "0s",
            exec: 'apiTest',
        },
        ramping_arrival_rate: {
            executor: 'ramping-arrival-rate',
            startTime: '0s',

            startRate: 50,
            timeUnit: '1s',

            stages: [
                { target: 1000, duration: '30s' },
                { target: 1000, duration: '30s' }, 
                { target: 0, duration: '30s' },
            ],
            preAllocatedVUs: 50,
            maxVUs: 100,
            exec: 'apiTest',
        },
    },
};

export async function apiTest() {
    let params = {
        module: "block",
        action: "getblockreward",
        blockno: 19657043,
        apikey: be_key
    };
    const res = http.get('https://api.etherscan.io/api', JSON.stringify(params));

    check(res, {
        'Get status is 200': (r) => res.status === 200,
    });
}
