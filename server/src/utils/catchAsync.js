export default (execution)=>{
    return (req,res,next)=>{
        execution(req,res,next).catch(next);
    }
}