<template>
    <div>
        <div style="padding: 10px;">
        <Card>
        <div id="query">
            <Form :model="query">
                <Row :gutter="12">
                    <Col span="3">
                        <FormItem><DatePicker v-model="query.submittime" placeholder="请选择提交日期" type="daterange"></DatePicker></FormItem></Col>
                    <Col span="3">
                        <FormItem><Input v-model="query.submitby" placeholder="请输入提交人姓名"/></FormItem></Col>
                    <Col span="3">
                        <FormItem><Input v-model="query.inspectby" placeholder="请输入审核人姓名"/></FormItem></Col>
                    <Col span="3">
                <FormItem>
                    <Select v-model="query.status" placeholder="状态" width="100%">
                        <Option v-for="item in wxstatuslist" :key="item.value" :value="item.value">{{item.title}}</Option>
                    </Select>
                </FormItem></Col>
                <Button type="primary"><Icon type="search"></Icon>  查询</Button>
                </Row>
            </Form>
        </div>
        <div id="table">
            <Table :columns="messagetablecolumn" :data="messagetabledata" v-bind:border="true" height=400></Table>
        </div>
            <Row type="flex" justify="end" :gutter="12">
                <Col><Button type="primary" @click="newMessage=true">新建微信消息</Button></Col>
                <Col><Button type="primary" @click="observemessage">查看微信消息</Button></Col>
            </Row>
        </Card>
        </div>
        <transition name="fade">
        <div v-if="newMessage" style="padding: 10px">
            <Card>
            <Row :gutter="12">
                <Col span="20">
                    <Form>
                        <FormItem label="收信人:">
                            <Input type="text" placeholder="请输入收件人信息或从右侧列表中选择收件人"/>
                        </FormItem>
                        <FormItem>
                            <Input type="textarea" placeholder="请输入信息内容"/>
                        </FormItem>
                    </Form>

                </Col>
                <Col span="4">
                    <div style="overflow:auto;">
                    <Tree ref="contactTree" :data="contactTree" v-bind:show-checkbox="true" @on-check-change="showcheckednodes"></Tree>
                    </div>
                </Col>
            </Row>
            </Card>
        </div></transition>
        <Modal v-model="modal1" width="60%">
            <div slot="header" style="font-size:15px;"><b>条目明细</b>
            </div>
            <div height="400px">
                <Row :gutter="12">
                    <Col id="contacttable_container" span="16">
                        接收人:
                        <Table :columns="contacttablecolumn" :data="contacttabledata" height=232></Table>
                    </Col>
                    <Col id="contacttree_container" span="8">
                        <transition name="fade">
                        <div v-if="showtree">
                            接收人选择:
                            <div style="height:200px;overflow:auto">
                            <Tree :data="contactTree" v-bind:show-checkbox="true"></Tree>
                            </div>
                            <Button long>确定</Button>
                        </div>
                        </transition>
                    </Col>
                </Row>
                <Row>
                    <Col :lg="16">
                内容:
                        <Input type="textarea" readonly="" v-bind:rows="5" /></Col>
                    <Col :lg="8">
                        审核状态:
                        <Card>
                        <p>微信状态: {{wxmessage.status}}</p>
                        <Row>
                            <Col :lg="8"><p>提交人: {{wxmessage.submitinf.submitby}}</p></Col>
                            <Col :lg="16"><p>提交时间: {{wxmessage.submitinf.submittime}}</p></Col>
                        </Row>
                        <Row>
                            <Col :lg="8"><p>审核人: {{wxmessage.inspectinf.inspectby}}</p></Col>
                            <Col :lg="16"><p>审核时间:{{wxmessage.inspectinf.inspecttime}}</p></Col>
                        </Row>
                        <p>退回原因: {{wxmessage.rejectreason}}</p></Card>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <ButtonGroup long>
                    <Button type="primary">审核</Button>
                    <Button type="error">删除</Button>
                    <Button type="ghost" @click="modifyMessage">修改</Button>
                </ButtonGroup>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "wxMessageMng",
        data:function(){
            return{
                newMessage:false,   //控制新建微信信息窗口
                showtree:false,
                modal1:false,       //控制信息明细弹窗
                query:{
                    sendto:"",
                  submittime:[],
                    submitby:"",
                    inspectby:"",
                    status:"",

                },
                wxmessage:
                    {
                        ID:"",
                        contact:[{id:"",name:"",company:"",status:""}],
                        content:"",
                        status:"",
                        submitinf:{submitby:"",submittime:""},
                        inspectinf:{inspectby:"",inspecttime:""},
                        rejectreason:""

            },
                messagetablecolumn:[
                    {key:"id",title:"微信编号",width:100},
                    {key:"content",title:"微信内容"},
                    {key:"status",title:"状态",width:100}],
                messagetabledata:this.mockwxTableData(),
                contacttablecolumn:[
                    {key:"id",title:"编号"},
                    {key:"name",title:"姓名"},
                    {key:"company",title:"所属机构"},
                    {key:"status",title:"状态"}],
                contacttabledata:[{},{},{},{},{},{},{},{},{}],
                wxstatuslist:[{value:"status1",title:"新提交/待审核"},{value:"status2",title:"审核通过/生效"},{value:"status3",title:"审核退回/待修改"}],
                contactTree:[]
            }
        },
        methods:{
            mockwxTableData(){
              let data = [];
              for(let i=0;i<10;i++){
                  data.push({
                      //此处放入表格数据ID:"",
                        contact:[{id:"",name:"",company:"",status:""}],
                        content:"",
                        status:"",
                        submitinf:{submitby:"",submittime:""},
                        inspectinf:{inspectby:"",inspecttime:""},
                        reason:""

                  })
              };
              return data;
            },
            modifyMessage(){
                this.showtree=!this.showtree;
            },
            showcheckednodes(){
                console.log(this.$refs.contactTree.getCheckedNodes())
            },
            observemessage(){
                this.modal1=true;
            }
        },
        mounted(){
            this.contactTree=[{title:'我去修管理系统',expand:true,children:[
                    {title:'A'},{title:'B'},{title:'C'}
                ]}]
        }
    }
</script>

<style scoped>
</style>