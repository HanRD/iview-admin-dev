<template>
    <div>
        <div id="table" style="padding:10px">
            <Card>
            <Form :model="query" inline>
                <Row type="flex" justify="space-between">
                    <Col>
                <FormItem>
                    <Select v-model="query.province" placeholder="请选择省/直辖市">
                        <Option v-for="item in provincelist" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Input v-model="query.companyName" placeholder="请输入公司名称" />
                </FormItem>
                        <Button type="primary" @click="search">搜索</Button></Col>
                    <Col><Button type="primary" @click="addNewCompany">新增维护公司信息</Button></Col>
                </Row>
            </Form>
            <Table :columns="companyTableColumn" :data="companyTableData" height=300></Table>
            </Card>
        </div>
        <Row>
            <Col span="12">
        <div id="stationInCharge" style="padding: 10px">
            <Card>
                <Row type="flex" justify="space-between"><Col>保修保养台站:</Col><Col><Button type="primary" @click="resetStationInCharge">重设保修保养台站</Button></Col></Row>
                <Table :columns="stationInChargeColumn" :data="stationInChargeData" height=350></Table>
            </Card>
        </div></Col>
            <Col span="12">
                <div id="staff" style="padding:10px">
                    <Card>
                <Row type="flex" justify="space-between"><Col>维护人员信息:</Col><Col><Button type="primary" @click="setStationForStaff">配置维修人员负责台站</Button></Col></Row>
                <Table :columns="simplifiedStaffTableColumn" :data="simplifiedStaffTableData" height="350"></Table>
                    </Card>
                </div>
            </Col>
            </Row>
        <Modal v-model="showModal">
            <p slot="header" style="text-align: center">{{Modaltitle}}</p>

            <Form :model="modalFormData" :label-width=120 label-position="left">
                <p style="margin-bottom:30px;text-align: center" v-if="modalFormData.id">{{modalFormData.id}}</p>
                <FormItem label="所属省份或直辖市:">
                    <Select v-model="modalFormData.province">
                    <Option v-for="item in provincelist" :key="item.value" :value="item.value">{{item.label}}</Option>
                </Select>
                </FormItem>
                <FormItem label="名称:"><Input type="text" v-model="modalFormData.companyName"/></FormItem>
                <FormItem label="地址:"><Input type="text" v-model="modalFormData.address"/></FormItem>
                <FormItem label="联系人:"><Input type="text" v-model="modalFormData.contactname"/></FormItem>
                <FormItem label="联系电话:"><Input type="text" v-model="modalFormData.contactPhoneNumber"/></FormItem>
            </Form>
            <p slot="footer">
            <Button type="ghost">测试</Button>
            </p>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "maintenanceOrgMng",
        data:function(){
            return{
                showModal:false,
                Modaltitle:"新增维护公司信息",
                Modaltype:0,
                query:{
                    province:"",
                    companyName:""
                },
                modalFormData:{
                    No:"",
                    id:"",
                    province:"",
                    address:"",
                    companyName:"",
                    contactname:"",
                    contactPhoneNumber:""

                },
                companyData:{
                    No:"",
                    id:"",
                    province:"",
                    address:"",
                    companyName:"",
                    contactname:"",
                    contactPhoneNumber:""
                },
                companyTableColumn:[{key:"No",title:"序号"},{key:"id",title:"编号"},{key:"province",title:"省属"},{key:"companyName",title:"名称"}],
                companyTableData:this.mockCompanyTableData(),
                provincelist:this.mockprovincelist(),
                stationInChargeColumn:[
                    {key:"No",title:"序号"},
                    {key:"stationID",title:"台站编号"},
                    {key:"stationName",title:"台站名称"},
                    {key:"orgInCharge",title:"所属气象局"}
                    ],
                stationInChargeData:this.mockStationTableData(),
                simplifiedStaffTableColumn:[
                    {key:"No",title:"序号"},
                    {key:"staffName",title:"用户姓名"},
                    {key:"skillLevel",title:"技术等级"},
                    {key:"status",title:"状态"}
                ],
                simplifiedStaffTableData:this.mockIdontKnowWTFisThis()
            }
        },
        methods:{
            mockCompanyTableData(){
                let data = [];
                for (let i=1;i<11;i++){
                    data.push({
                        No:i,
                        id:Math.floor(Math.random()*10000),
                        province:"",
                        companyName:"公司"+i,
                        address:"",
                        contactname:"",
                        contactPhoneNumber:""
                    })
                }
                console.log(data);
                return data;
            },
            mockStationTableData(){
                let data =[]
                for(let i=1;i<11;i++){
                    data.push({
                        No:i,
                        stationID:Math.floor(Math.random()*10000),
                        stationName:"台站"+i,
                        orgInCharge:"机构"+(11-i),
                    })
                }
                return data;
            },
            mockprovincelist(){
                let data=[];
                for(let i=0;i<10;i++){
                    data.push({value:"province"+i,label:"省份"+i})

                }
                return data;
            },
            mockIdontKnowWTFisThis(){
              let data=[];
              for(let i=0;i<10;i++){
                  data.push({

                  })
              }
              return data;
            },
            search(){
                console.log(this.query);
            },
            addNewCompany(){
                console.log("addNewCompany")
            },
            setStationForStaff(){
                console.log("setStationForStaff")
            },
            resetStationInCharge(){
                console.log("resetStationInCharge")
            }
        },
        mounted(){
            console.log(this)
        },

    }
</script>

<style scoped>

</style>