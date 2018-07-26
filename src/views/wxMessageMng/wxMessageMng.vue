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
        <Button type="error" @click="modal1=true" long>弹窗测试，记得删掉</Button>
        </Card>
        </div>
        <div style="padding: 10px">
            <Card>
            <Row :gutter="12">
                <Col span="20">
                    <Form>
                        <FormItem label="收信人:">
                            <Input type="text"/>
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
        </div>
        <Modal v-model="modal1" width="60%">
            <div slot="header" style="font-size:15px;"><b>条目明细</b>
            </div>
            <div height="400px">
                <Row :gutter="12">
                    <Col id="contacttable_container" span="16">
                        接收人:
                        <Table :columns="contacttablecolumn" :data="contacttabledata" height=332></Table>
                    </Col>
                    <Col id="contacttree_container" span="8">
                        <transition name="fade">
                        <div v-if="showtree">
                            接收人选择:
                            <div style="height:300px;overflow:auto">
                            <Tree :data="contactTree" v-bind:show-checkbox="true"></Tree>
                            </div>
                            <Button long>确定</Button>
                        </div>
                        </transition>
                    </Col>
                </Row>

                内容:
                <Input type="textarea" readonly="" />
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
                showtree:false,
                showborder:true,
                showCheckbox:true,
                modal1:false,
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
                        reason:""

            },
                messagetablecolumn:[{value:"id",title:"微信编号",width:100},{value:"content",title:"微信内容"},{value:"status",title:"状态",width:100}],
                messagetabledata:this.mockwxTableData(),
                contacttablecolumn:[{value:"id",title:"编号"},{value:"name",title:"姓名"},{value:"company",title:"所属机构"},{value:"status",title:"状态"}],
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