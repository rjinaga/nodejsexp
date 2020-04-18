import * as core from 'express-serve-static-core';


export const home = (req: core.Request, res: core.Response): void => {
    res.send('<h2 style="color: #3260a8">Welcome to Next Node Js REST Api</h2>');
};

