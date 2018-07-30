<template>
   <div>
       <div style="padding: 10px;">
           <Card>
               <Row type="flex" justify="space-between"><Col>
               <Form :model="query" inline>
                   <FormItem><DatePicker v-model="query.daterange[0]" placeholder="请选择起始日期"></DatePicker><DatePicker v-model="query.daterange[1]" placeholder="请选择结束日期"></DatePicker></FormItem>
                   <FormItem><Input v-model="query.submitby" placeholder="请输入提交人姓名" /></FormItem>
                   <FormItem><Input v-model="query.inspectby" placeholder="请输入审核人姓名" /></FormItem>
                   <FormItem>
                       <Select v-model="query.status" placeholder="请选择公告状态">
                           <Option v-for="item in statuslist" :value="item.value" :key="item.value">{{item.label}}</Option>
                       </Select>
                   </FormItem>
                   <Button type="primary" @click="queryBroadcast">查询</Button>
               </Form></Col>
                   <Col>
                       <Button type="primary" @click="reviseBroadcast" :disabled="!rowhighlighted">查看</Button>
                       <Button type="error" @click="deleteBroadcast" :disabled="!rowhighlighted">删除</Button>
                       <Button type="primary" @click="verifyBroadcast" :disabled="!verifiable">审核</Button>
                   </Col>
               </Row>
               <Table :columns="broadcastTableColumns" :data="broadcastTableData" highlight-row @on-current-change="holdclickedrow"></Table>
           </Card>
       </div>
       <div>
           <Modal v-model="showmodal" :closable="false">
               <div slot="header">
                   <Row type="flex" justify="space-between">
                       <Col><p>公告信息</p></Col>
                       <Col>
                           <Tag v-if="broadcastData.status==0"  color="#2D8CF0">新提交/待审核</Tag>
                           <Tag v-else-if="broadcastData.status==1" color="green">审核通过/生效</Tag>
                           <Tag v-else color="red">审核退回/待修改</Tag></Col>
                   </Row></div>
                   <div style="padding:5px 0px;">接收人员:</div>
                   <Table :columns="receiverTableColumns" :data="broadcastData.receiverList" stripe height=300></Table>
                   <div style="padding: 5px 0px">公告内容:</div>
                   <Input v-model="broadcastData.content" readonly :rows="3" />
               <Card>
                   <Row :gutter="12">
                       <Col span="8">
                           <div>提交人:{{broadcastData.submitby}}</div>
                           <div>审核人:{{broadcastData.verifyBy}}</div>
                       </Col>
                       <Col span="16">
                           <div>提交时间:{{broadcastData.submitTime}}</div>
                           <div>审核时间:{{broadcastData.verifyTime}}</div>
                       </Col>
                   </Row>
                   <div v-if="broadcastData.status===2">退回原因:{{broadcastData.whySendBack}}</div>
               </Card>
           </Modal>
       </div>
   </div>
</template>

<script>
    export default {
        name: "systemBroadcastMng",
        data:function(){
            return{
                rowhighlighted:false,
                verifiable:false,
                showmodal:false,
                selectedIndex:Number,
                query:{
                    daterange:[],
                    submitby:"",
                    inspectby:"",
                    status:""
                },
                statuslist:[
                    {value:0,label:"新提交/待审核"},
                    {value:1,label:"审核通过/生效"},
                    {value:2,label:"审核退回/待修改"}],
                broadcastTableColumns:[
                    {key:"No",title:"序号"},
                    {key:"broadcastID",title:"公告编号"},
                    {key:"content",title:"公告内容"},
                    {key:"status",title:"状态",render:(h,params)=>{
                        const row=params.row;
                        const color = row.status===0?"#2D8CF0":row.status===1?"green":"red";
                        const text = row.status===0?"新提交/待审核":row.status===1?"审核通过/生效":"审核退回/待修改";
                        return h('Tag',{props:{type:"dot",color:color}},text);
                        }}],
                broadcastTableData:this.mockBroadcastTableData(),
                broadcastData:{
                    receiverList:[],
                    content:"",
                    status:Number,
                    submitby:"",
                    submitTime:"",
                    verifyBy:"",
                    verifyTime:"",
                    whySendBack:""

                },
                receiverTableColumns:this.mockReceiverTableColumns(),
            }
        },
        methods:{
            queryBroadcast(){
                console.log(this.query)
            },
            mockBroadcastTableData(){
                let data=[];
                for(let i=1;i<11;i++){
                    data.push({
                        receiverList:this.mockReceiver(),
                        No:i,
                        broadcastID:("000000"+Math.floor(Math.random()*100)).slice(-6),
                        content:"公告"+i,
                        status:Math.floor(Math.random()*3),
                        submitby:"",
                        submitTime:"",
                        verifyBy:"",
                        verifyTime:"",
                        whySendBack:""
                    })
                }
                return data;
            },
            reviseBroadcast(){
                this.showmodal=true;
            },
            deleteBroadcast(){
                console.log("删除")
            },
            verifyBroadcast(){
                console.log("审核")
                this.broadcastTableData[this.broadcastData.No-1].status=1;
                this.broadcastData.status=1;
            },
            holdclickedrow(currentRow){
                if(!this.rowhighlighted){
                    this.rowhighlighted=true;
                }
                this.broadcastData=currentRow;
                if(currentRow.status===0){
                    this.verifiable=true;
                }
                else{
                    this.verifiable=false;
                }
                console.log(this.broadcastData)
            },
            mockReceiver(){
                let data=[];
                const receiverTableLength=Math.floor(Math.random()*21)+1;
                for(let i=1;i<receiverTableLength;i++){
                    data.push({
                        No:i,
                        ID:("000000"+Math.floor(Math.random()*100)).slice(-6),
                        name:this.getRandomName(),
                        company:this.getRandomCompany(),
                        status:Math.floor(Math.random()*2)
                    })
                }
                return data;
            },
            getRandomName(){
                let firstNames =
["赵","钱","孙","李","周","吴","郑","王","冯","陈",
"褚","卫","蒋","沈","韩","杨","朱","秦","尤","许",
"何","吕","施","张","孔","曹","严","华","金","魏",
"陶","姜","戚","谢","邹","喻","柏","水","窦","章",
"云","苏","潘","葛","奚","范","彭","郎","鲁","韦",
"昌","马","苗","凤","花","方","俞","任","袁","柳",
"酆","鲍","史","唐","费","廉","岑","薛","雷","贺",
"倪","汤","滕","殷","罗","毕","郝","邬","安","常",
"乐","于","时","傅","皮","卞","齐","康","伍","余",
"元","卜","顾","孟","平","黄","和","穆","萧","尹",
"欧阳","慕容"];
        let secondNames = ["子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
            "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
            "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
            "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
            "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
            "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
            "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
            "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
            "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
            "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"];

        const firstLength = parseInt(firstNames.length);
        const secondLength = parseInt(secondNames.length);

        const i = parseInt(Math.random()*firstLength);
        const j = parseInt(Math.random()*secondLength);

        let fullname = firstNames[i]+secondNames[j];

        return fullname;

    },
            getRandomCompany(){
                let companylist = ["天识科技有限公司","测试公司","成都锦天联华科技有限责任公司","我去修系统","资阳市气象局"];
                const arrlength=companylist.length;
                const i = parseInt(Math.random()*arrlength);
                let company=companylist[i];
                return company;
            },
            mockReceiverTableColumns(){
                let data=[];
                const keyArr=["No","ID","name","company"];
                const titleArr=["序号","编号","姓名","所属机构"];
                const widthArr=[80,80,80];
                for (let i=0;i<4;i++){
                    if(widthArr[i]){
                    data.push({
                        key:keyArr[i],
                        title:titleArr[i],
                        width:widthArr[i],
                        align:"center"
                    })}
                    else{
                        data.push({
                            key:keyArr[i],
                            title:titleArr[i],
                            align:"center"
                        })
                    }
                }
                return data;
            }
        }
    }
</script>

<style scoped>

</style>