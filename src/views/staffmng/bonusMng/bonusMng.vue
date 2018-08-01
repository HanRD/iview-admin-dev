<template>
    <div>
        <div style="padding: 10px;background: #EEE">
            <Card>
                <div>
                    <Form inline>
                        <FormItem>
                            <Select placeholder="请选择维护公司">
                                <Option v-for="item in companylist" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="" />
                        </FormItem>
                        <FormItem>
                            <Input />
                        </FormItem>
                        <FormItem>
                            <DatePicker type="daterange" split-panels placeholder="请选择起始结束日期"></DatePicker>
                        </FormItem>
                        <Button type="primary" @click="query">查询</Button>
                    </Form>
                    <Table :columns="bonusTableColumns" :data="bonusTableData"></Table>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import util from '../../../libs/util'
    export default {
        name: "bonusMng",
        data:function(){
            return{
                companylist:[],
                bonusTableColumns:this.mockBonusTableColumns(),
                bonusTableData:this.mockTableData()
            }
        },
        methods:{
            query(){

            },
            mockBonusTableColumns(){

            },
            mockTableData(){

            }
        }
    }
</script>

<style scoped>

</style>