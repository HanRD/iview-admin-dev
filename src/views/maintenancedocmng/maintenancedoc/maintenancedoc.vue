<style lang="less">
    @import "maintenancedoc.less";
</style>
<template>
    <div>
        <Card>
            <div class="doc-header-con">
                <h3>维护单信息</h3>
            </div>
            <Form class="doc-form" :model="documentdata" :label-width="90" label-position="left">
                <Row :gutter="12">
                    <Col span="12">
                <FormItem prop="reportedOrg" label="报障气象局: ">
                    <Select v-model="documentdata.reportedOrg">
                        <Option v-for="item in orgList" :key="item.value" :value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                    </Col>
                    <Col span="12">
                <FormItem prop="stationName" label="气象站台站: ">
                    <Select v-model="documentdata.stationName">
                        <Option v-for="item in stationList":key="item.value" :value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                <FormItem prop="inspectionPlan" label="巡检方案: ">
                    <Select v-model="documentdata.inspectionPlan">
                        <Option v-for="item in planList":key="item.value" :value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                    <Col span="12">
                <FormItem prop="maintenanceCostSum" label="总维护价格: ">
                    <Input type="text"></Input>
                </FormItem>
                    </Col>
                    <Col span="12">
                <FormItem prop="point" label="维修积分: ">
                    <Input type="text"></Input>
                </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                <FormItem prop="confirmMode" label="确认模式: ">
                    <radio-group v-model="documentdata.confirmMode">
                        <Radio label="automatic">自动确认</Radio>
                        <Radio label="manualbyoperator">管理人员确认</Radio>
                    </radio-group>
                </FormItem>
                    </Col>
                    <Col span="12">
                <FormItem prop="maintenanceTimeLimit" label="维护完成时限: ">
                    <DatePicker v-model="documentdata.maintenanceTimeLimit"></DatePicker>
                </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                <FormItem prop="maintenanceCategory" label="维护类别: ">
                    <Select v-model="documentdata.maintenanceCategory">
                        <Option v-for="item in categorylist" :key="item.value" :value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                    </Col>
                    <Col span="12">
                <FormItem prop="maintenanceCategory" label="任务级别: ">
                    <Select v-model="documentdata.maintenanceCategory">
                        <Option v-for="item in tasklevellist" :key="item.value" :value="item.label">{{item.label}}</Option>
                    </Select>
                </FormItem>
                    </Col>
                </Row>
                <FormItem v-if="documentdata.maintenanceCategory=='维修'" prop="maintenancedoc" label="报障单编号: ">
                    <Input type="text" v-model="documentdata.maintenancedoc"></Input>
                </FormItem>

                <FormItem prop="description" label="故障描述: ">
                    <Input type="textarea" v-model="documentdata.description"></Input>
                </FormItem>

                <FormItem prop="note" label="备注: ">
                    <Input type="textarea" v-model="documentdata.note"></Input>
                </FormItem>
            </Form>
            <p>当前正在进行第 {{ current + 1 }} 步</p>
            <Steps :current="current">
                <Step v-for="item in steplist" :key="item.value" :title="item.title"></Step>
            </Steps>
            <Button type="primary" @click="next">Next step</Button>
        </Card>
    </div>
</template>

<script>
    var hr, day;
    export default {
        data () {
            return {
                current: 0,
                steplist: [],
                orgList: [],
                stationList: [],
                planList: [],
                categorylist: [],
                tasklevellist: [],
                documentdata: {
                    documentID: '',
                    reportedOrg: '',
                    stationName: '',
                    inspectionPlan: '',
                    documentstatus: 'status2',
                    maintenanceCostSum: 0,
                    point: 0,
                    confirmMode: '',
                    maintenanceTimeLimit: '',
                    maintenanceCategory: '',
                    taskLevel: '',
                    description: '',
                    note: '',
                    maintenancedoc: ''},
                hasSubmit: false,
                currentstep: 0,
                status: 'wait'
            };
        },
        methods: {
            next () {
                if (this.current == 6) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            format (val) {
                day = Math.floor(val / 24);
                hr = val % 24;
                return day + ' 天 ' + hr + ' 小时';
            }
        },
        mounted () {
            console.log(this.$route.query.documentdata);
            this.steplist = [
                {title: '待审核'}, {title: '待发布'}, {title: '已发布'}, {title: '处理中'}, {title: '提交中'}, {title: '已提交'}, {title: '完成'}
            ];
            this.orgList = [{
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            }];
            this.stationList = [{
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            }];
            this.planList = [
                {value: 'plan1', label: '计划1'},
                {value: 'plan2', label: '计划2'},
                {value: 'plan3', label: '计划3'},
                {value: 'plan4', label: '计划4'}
            ];
            this.categorylist = [
                {value: 'cat1', label: '标定'},
                {value: 'cat2', label: '维护'},
                {value: 'cat3', label: '维修'}];
            this.tasklevellist = [
                {value: 'level1', label: '一级'},
                {value: 'level2', label: '二级'},
                {value: 'level3', label: '三级'},
                {value: 'level4', label: '四级'}];
        },
        watch:{
            '$route'(){
                console.log(this.route.query.documentdata.toString())
            }
        }
    };
</script>

<style scoped>

</style>