import { exec} from "../../src/services/dummy-service.js";
import { helper } from '../../src/services/helper-service.js';

jest.mock('../../src/services/helper-service.js');
test('result true returns learning Js', ()=>{
    helper.mockReturnValue(true);
    expect(exec()).toBe('Learning Js');
}) 

test('result false returns learning React', ()=>{
    helper.mockReturnValue(false);
    expect(exec()).toBe('Learning React');
})