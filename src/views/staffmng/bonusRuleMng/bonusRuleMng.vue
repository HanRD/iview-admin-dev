<template>
    <div>
        <Row>
            <Col span="6">
        <div style="padding: 10px;background: #eee;">
           <Card>
               <p slot="title">台站选择</p>
               <Tree v-model="bonusRuleQuery.station" ></Tree>
           </Card>
        </div>
            </Col>
            <Col span="18">
        <div style="padding: 10px;background: #eee;">
            <Card>
                <Row type="flex" justify="space-between"><Col>
                <Form :model="bonusRuleQuery" inline>
                    <FormItem><DatePicker v-model="bonusRuleQuery.daterange" type="daterange" split-panels placeholder="请选择起始结束日期"></DatePicker></FormItem>
                    <FormItem><Input v-model="bonusRuleQuery.accomplishedStaff" type="text" placeholder="请输入完成人姓名"/></FormItem>
                    <FormItem><Input v-model="bonusRuleQuery.receivingStaff" type="text" placeholder="请输入接受人姓名"/></FormItem>
                    <Button type="primary" @click="query">查询</Button>
                </Form></Col>
                    <Col>
                        <Button type="primary" @click="exportTableData">导出</Button>
                        <Button type="primary" @click="addNewRule">新增</Button>
                    </Col>
                </Row>
                <Table :columns="bonusRuleTableColumn" :data="bonusRuleTableData" highlight-row @on-current-change="holdselectedrow" width="1090"></Table>
                <Row type="flex" justify="end">
                    <Col><Button type="error" v-if="showdisableBTN">禁用</Button>
                        <Button type="primary" :disabled="!editableRule">修改</Button>
                    <Button type="error" :disabled="!editableRule">删除</Button></Col>
                </Row>
            </Card>
        </div>
            </Col>
        </Row>
        <Modal v-model="showmodal" :closable="false" :mask-closable="false">
            <div slot="header"><p>{{modaltitle}}</p></div>
            <Form ref="ruleDataForm" :label-width=80 label-position="left">
                <FormItem label="有效期限"><DatePicker v-model="bonusRuleData.daterange" type="daterange" ></DatePicker></FormItem>
                <FormItem label="适用范围">
                <div>
                    <Row>
                    <Col span="8">
                        <FormItem>
                            <Cascader v-model="bonusRuleData.accomplishedStaff" :data="staffTreedata" change-on-select filterable placeholder="执行人员"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem>
                            <Cascader v-model="bonusRuleData.receivingStaff" :data="staffTreedata" change-on-select filterable placeholder="受奖人员"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem>
                            <Cascader v-model="bonusRuleData.awardingStation" :data="stationTreedata" change-on-select filterable placeholder="受奖台站"></Cascader>
                        </FormItem>
                    </Col>
                </Row></div></FormItem>
                <FormItem label="奖励金额"><Input v-model="bonusRuleData.bonusAmount" type="text" /></FormItem>
                <FormItem label="奖励事由">
                    <Select v-model="bonusRuleData.bonusReason">
                        <Option v-for="item in bonusReason" :value="item.label" :key="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="维护类别">
                    <Select v-model="bonusRuleData.maintenanceCategory">
                        <Option v-for="item in maintenanceCategory" :value="item.label" :key="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="限定月份">
                    <Select v-model="bonusRuleData.effectMonths" multiple>
                        <Option v-for="item in effectMonth" :value="item.label" :key="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="发放规则">
                    <RadioGroup v-model="bonusRuleData.distributingRules.type" @on-change="setparameters">
                        <Radio label="有效期内每单都奖"></Radio>
                        <Radio label="有效期内每月奖励指定次数"></Radio>
                        <Radio label="有效期内共奖励指定次数"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if="showparameterslot" label="次数设置"><Input type="text" v-model="bonusRuleData.distributingRules.parameter" /></FormItem>
                <FormItem label="备注"><Input v-model="bonusRuleData.note" type="textarea" /></FormItem>
            </Form>
            <div slot="footer">
                <Button @click="quit">取消</Button>
                <Button type="primary" @click="submit">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '../../../libs/util'
    export default {
        name: "bonusRuleMng",
        data:function () {
            return{
                showdisableBTN:false,
                modaltitle:"新增工资奖励规则",
                showparameterslot:false,
                showmodal:false,
                editableRule:false,
                bonusRuleQuery:{
                    station:"",
                    daterange:[],
                    accomplishedStaff:"",
                    receivingStaff:""
                },
                bonusRuleTableColumn:this.mockbonusRuleTableColumn(),
                bonusRuleTableData:this.mockbonusRuleTableData(),
                bonusRuleData:{
                    daterange:[],
                    accomplishedStaff:[],
                    receivingStaff:[],
                    awardingStation:[],
                    bonusReason:"",
                    maintenanceCategory:"",
                    bonusAmount:"",
                    distributingRules:{type:"",parameter:""},
                    effectMonths:[],
                    note:""

                },
                staffTreedata:this.mockstaffTree(),
                stationTreedata:this.mockstationTree(),
                bonusReason:this.mockReasonList(),
                maintenanceCategory:this.mockCategoryList(),
                effectMonth:this.mockMonthList(),

            }
        },
        methods:{
            query(){
                console.log(this.bonusRuleQuery)
            },
            holdselectedrow(data){
                console.log(data)
                if(data.status===1){
                    this.showdisableBTN=true
                }
                else{
                    this.showdisableBTN=false
                }
            },
            mockbonusRuleTableColumn(){
                let data=[];
                const keyArr=['id','availabledate','staff','mtcategoryid','station','reason','amount','effectMonth','rule','status','executed','createdby','createtime','reviseby','revisetime','note'];
                const titleArr=['规则编号','有效期','维护/受益','维护类别','台站','事由','金额','限定月份','奖励规则','状态','已执行','创建人员','创建时间','修改人员','修改时间','备注'];
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                return data
            },
            mockbonusRuleTableData(){
                return util.mockblankrow();
            },
            exportTableData(){
                console.log('导出')
                const i =Math.floor(Math.random()*10)
                this.bonusRuleTableData[i].status=1
            },
            addNewRule(){
                this.showmodal=true;
                console.log("新增")
            },
            submit(){
                console.log(this.bonusRuleData)
            },
            quit(){
                this.showmodal=false;
                this.$refs.ruleDataForm.resetFields();
            },
            mockstaffTree(){
                let data=[];
                data=util.generateRandomTree('staff');
                return data
            },
            mockstationTree(){
                let data=[];
                data=util.generateRandomTree('station');
                return data
            },
            mockReasonList(){
                let data=[];
                data=util.getStandardSelectList();
                return data;
            },
            mockCategoryList(){

                let data=[];
                data=util.getStandardSelectList();
                return data;
            },
            mockMonthList(){

                let data=[];
                data=util.getStandardSelectList();
                return data;
            },
            setparameters(data){
                console.log(data)
                if(data==='有效期内每月奖励指定次数'||data==='有效期内共奖励指定次数'){
                    this.showparameterslot=true
                }
                else{
                    this.showparameterslot=false
                }
            }

        }
    }
</script>

<style scoped>

</style>