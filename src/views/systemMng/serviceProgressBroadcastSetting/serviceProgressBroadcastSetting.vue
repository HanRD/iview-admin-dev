<template>
    <div style="padding: 10px;background: #eee">
        <Card>
            <Table :columns="receiverTableColumns" :data="receiverTableData" ></Table>
            <Card>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Checkbox v-model="broadcastToRepairingStaff">报障人员是否接收微信通知</Checkbox>
                    </Col>
                    <Col>
                        <Button type="primary" @click="submit">提交</Button>
                    </Col>
                </Row>
            </Card>
        </Card>
    </div>
</template>

<script>
    import util from '../../../libs/util.js'
    export default {
        name: "serviceProgressBroadcastSetting",
        data:function(){
            return{
                receiverTableColumns:this.mockreceiverTableColumns(),
                receiverTableData:this.mockreceiverTableData(),
                broadcastToRepairingStaff:false,
            }
        },
        methods:{
            mockreceiverTableColumns(){
                let data=[];
                const keyArr=['opID','opname'];
                const titleArr=['管理人员编号','管理人员姓名'];
                data.push({
                    type:"selection",
                    width:60,
                    align:"center"
                });
                data=util.renderTableNoColumn(data);
                data=util.renderTableNormalColumn(data,keyArr,titleArr);
                return data;
            },
            mockreceiverTableData(){
                return util.mockblankrow()
            },
            submit(){
                console.log("提交")
            }
        }
    }
</script>

<style scoped>

</style>