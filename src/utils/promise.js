/* @flow */
import { pro } from 'flow-dynamic';
const { mustBe } = pro;

export function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// result alway be an Array [a,b,c]
export function promisify1arg(callback_fn: Function): () => Promise<any> {
  return to_promise;

  function to_promise(...args): Promise<any>  {
    return new Promise(function(resolve, reject) {
      args.push(function(err, ...result) { // all nodejs's last arg is callback
        mustBe(true, result.length <= 1,
          'This function must return signle result');
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
      callback_fn.apply(null, args);
    });
  }
}
export function promisify(fn: Function, firstData?: boolean): () => Promise<any> {
  return function(...args): Promise<any> {
    return new Promise(function(resolve, reject) {
      args.push(function(err, ...result) {
        let res = result;

        if (firstData) {
          res = err;
          err = null;
        }

        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

      fn.apply(null, args);
    });
  };
}

export function promisifyObject(obj: {
  [key: string]: Function
}): {
  [key: string]: () => Promise<any>
} {
  const promisedObj = {};
  for (const key in obj) {
    promisedObj[key] = promisify(obj[key]);
  }
  return promisedObj;
}

export function queue<T>(
  arr: Array<any>,
  promiseProducer: (result: any) => Promise<T>,
  concurrency: number = Infinity,
): Promise<Array<T>> {
  concurrency = Math.min(concurrency, arr.length);

  // clone
  arr = arr.slice();

  const results = [];
  let total = arr.length;
  if (!total) {
    return Promise.resolve(results);
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < concurrency; i++) {
      next();
    }

    function next() {
      const item = arr.shift();
      const promise = promiseProducer(item);

      promise.then(function(result) {
        results.push(result);

        total--;
        if (total === 0) {
          resolve(results);
        } else {
          if (arr.length) {
            next();
          }
        }
      }, reject);
    }
  });
}
