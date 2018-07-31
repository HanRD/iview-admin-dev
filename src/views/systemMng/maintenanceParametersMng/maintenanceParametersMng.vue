<template>
    <div>
        <div class="modulecard">
            <Card>
                <div slot="title">
                    <Row type="flex" justify="space-between">
                        <Col>
                            <p>维护任务级别</p>
                        </Col>
                        <Col>
                            <div>
                                <Button type="primary" size="small" @click="exportTable('Table1')">导出</Button>
                                <Button type="primary" size="small" @click="addNewTaskLevel()">新增</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Table ref="Table1" :columns="tasklevelTableColumns" :data="tasklevelTableData" height=300></Table>
            </Card>
        </div>
        <div class="modulecard">
            <Card>
                <div slot="title">
                    <Row type="flex" justify="space-between">
                        <Col>
                            <p>维护任务类别</p>
                        </Col>
                        <Col>
                            <div>
                                <Button type="primary" size="small" @click="exportTable('Table2')">导出</Button>
                                <Button type="primary" size="small" @click="addNewTaskCategory">新增</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Table ref="Table2" :columns="taskCategoryTableColumns" :data="taskCategoryTableData" height=300></Table>
            </Card>
        </div>
        <Modal v-model="tasklevelModal">
            <div slot="header">
                <p v-if="ModalType==='observe'">查看维护任务级别信息</p>
                <p v-if="ModalType==='new'">新增维护任务级别信息</p>
            </div>
            <Form :model="taskleveldata" :label-width=80 label-position="left" :rules="ruleValidate" ref="tasklevelform">
                <FormItem prop="category" label="维护类别:"><Input type="text" v-model="taskleveldata.category" :disabled="!editable"/></FormItem>
                <FormItem prop="level" label="任务级别:"><Input type="text" v-model="taskleveldata.level" :disabled="!editable"/></FormItem>
                <FormItem prop="description" label="级别描述:"><Input type="textarea" v-model="taskleveldata.description" :disabled="!editable"/></FormItem>
                <FormItem prop="point" label="级别积分:"><Input type="text" v-model="taskleveldata.point" :disabled="!editable"/></FormItem>
                <FormItem prop="classlevel" label="级别等级:"><Input type="text" v-model="taskleveldata.classlevel" :disabled="!editable"/></FormItem>
                <FormItem prop="note" label="备注"><Input type="textarea" v-model="taskleveldata.note" :disabled="!editable"/></FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeModal()">返回</Button>
                <Button v-if="!editable" type="primary" @click="editable=true">修改</Button>
                <Button v-else type="primary" @click="submitItem('tasklevelform')">提交</Button>
            </div>
        </Modal>
        <Modal v-model="taskcategoryModal" :mask-closable="false" :closable="false">
            <div slot="header">
                <p v-if="ModalType==='observe'">修改维护类别</p>
                <p v-if="ModalType==='new'">新增维护类别</p>
            </div>
            <Form :model="taskCategoryData" :rules="ruleValidate1" ref="taskCategoryForm">
                <FormItem prop="name" label="类别名称"><Input type="text" v-model="taskCategoryData.name"/></FormItem>
                <FormItem prop="description" label="类别描述"><Input type="textarea" v-model="taskCategoryData.description" /></FormItem>
                <FormItem v-if="ModalType==='observe'" prop="status" label="类别状态">
                    <Select v-model="taskCategoryData.status">
                        <Option value=1>有效</Option>
                        <Option value=0>停用</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeModal()">取消</Button>
                <Button type="primary" @click="submitItem('taskCategoryForm')">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "maintenanceParametersMng",
        data:function(){
            return{
                selectedTable:"",
                tasklevelModal:false,
                ModalType:"",
                taskcategoryModal:false,
                editable:false,
                tasklevelTableColumns:this.mocktasklevelTableColumns(),
                tasklevelTableData:this.mocktasklevelTableData(),
                taskCategoryTableColumns:this.mocktaskCategoryTableColumns(),
                taskCategoryTableData:this.mocktaskCategoryTableData(),
                taskleveldata:{
                    No:Number,
                    category:"",
                    level:"",
                    description:"",
                    point:"",
                    classlevel:"",
                    note:"",
                },
                taskCategoryData:{
                    No:Number,
                    name:"",
                    description:"",
                    status:Number,
                },
                ruleValidate:{
                    level:[{required:true,message:"请填写任务级别",trigger:'blur'}],
                    description:[{required:true,message:"请填写级别描述",trigger:'blur'}]
                },
                ruleValidate1:{
                    name:[
                        {required:true,message:"请填写维护类别名称",trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            mocktasklevelTableColumns(){
                let data=[];
                const keyArr=['No','category','level','point'];
                const titleArr=['序号','维护类别','任务级别','积分'];
                data=this.mockColumns(keyArr,titleArr);
                data.push({
                    key:"control",
                    title:"操作",
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{type:"primary",size:"small"},
                                on:{click:()=>{this.showlevel(params.index)}}
                                },"查看"),
                            h('Button',{
                                props:{type:"error",size:"small"},
                                on:{click:()=>{this.removelevel(params.index)}}
                            },"删除")
                        ])
                    }
                });
                return data;
            },
            mocktasklevelTableData(){
                let data=[];
                for(let i=0;i<10;i++){
                    data.push({

                    })
                }
                return data;
            },
            mocktaskCategoryTableColumns(){
                let data=[];
                const keyArr=['No','name','description'];
                const titleArr=['序号','类别名称','类别描述'];
                data=this.mockColumns(keyArr,titleArr);
                data.push({
                    key:'status',
                    title:'类别状态',
                    render:(h,params)=>{
                        const row = params.row;
                        const color=row.status===1?'green':'red';
                        const tip=row.status===1?'有效':'停用';
                        return h('Tag',{props:{type:"dot",color:color}},tip)
                    }
                });
                data.push({
                    key:"control",
                    title:"操作",
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{type:"primary",size:"small"},
                                on:{click:()=>{this.revisecategory(params.index)}}
                            },"修改"),
                            h('Button',{
                                props:{type:"error",size:"small"},
                                on:{click:()=>{this.removecategory(params.index)}}
                            },"删除")
                        ])
                    }
                });
                return data;

            },
            mocktaskCategoryTableData(){
                let data=[];
                for(let i=1;i<11;i++){
                    data.push({
                        No:i,
                        name:"类别"+i,
                        description:"描述"+i,
                        status:Math.floor(Math.random()*2)
                    })
                }
                return data;
            },
            mockColumns(keyArr,titleArr){
                const length=keyArr.length;
                let data=[];
                for (let i=0;i<length;i++){
                    data.push({
                        key:keyArr[i],
                        title:titleArr[i]
                    })

                }
                return data;
            },
            addNewTaskLevel(){
                this.ModalType="new";
                this.editable=true;
                const args=this.tasklevelTableData;
                const index=args[args.length-1].No+1;
                this.taskleveldata={
                    No:index,
                    category:"",
                    level:"",
                    description:"",
                    point:"",
                    classlevel:"",
                    note:"",
                };
                this.tasklevelModal=true;

            },
            addNewTaskCategory(){
                this.ModalType="new";
                const args=this.taskCategoryTableData;
                const index=args[args.length-1].No+1;
                this.taskCategoryData={
                    No:index,
                    name:"",
                    description:"",
                    status:1,
                };
                this.taskcategoryModal=true;
            },
            //查看数据
            showlevel(index){
                Object.assign(this.taskleveldata,this.tasklevelTableData[index]);
                this.ModalType="observe";
                this.editable=false;
                console.log("查看第"+(index+1)+"行数据");
                this.tasklevelModal=true
            },
            //删除数据
            removelevel(index){
                console.log("删除第"+(index+1)+"行数据");
            },
            revisecategory(index){
                Object.assign(this.taskCategoryData,this.taskCategoryTableData[index]);
                this.ModalType='observe';
                this.taskcategoryModal=true;
            },
            removecategory(index){
                console.log("删除第"+(index+1)+"行数据")
            },
            closeModal(){
              this.$refs.tasklevelform.resetFields();
                if(this.tasklevelModal){
                    this.tasklevelModal=false;
                }
                if(this.taskcategoryModal){
                    this.taskcategoryModal=false;
                }
            },
            //提交弹窗1表单
            submitItem(index){
                console.log("提交内容");
                this.$refs[index].validate((valid)=>{
                    if(valid){
                        //这里写提交方法
                        this.$Message.success("成功!");
                        if(this.tasklevelModal){
                            this.tasklevelModal=false;
                        }
                        if(this.taskcategoryModal){
                            this.taskcategoryModal=false;
                        }
                    }else{
                        this.$Message.error("提交失败");
                    }
                });
            },
            exportTable(index){
                this.selectedTable=index;
                this.$Modal.confirm({
                    title:"下载表格数据",
                    content:"确认要下载表格数据吗？",
                    onOk:this.downloadTableData,
                })
            },
            downloadTableData(){
                const index=this.selectedTable;
                const filename=index==="Table1"?"维护任务级别表格":"维护任务类别表格";
                this.$refs[index].exportCsv({filename:filename});
            }
        }

    }
</script>

<style scoped>
    .modulecard{
        background:#eee;
        padding: 10px;
    }
</style>
