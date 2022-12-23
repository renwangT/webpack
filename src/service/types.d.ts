/**
 * @tag 队列类型 R-收箱 D-提箱 U-卸船 L-装船 C-查验 M-移箱 S-翻箱/核场 P-装火车 G-卸火车
 */
type QueueType = "R" | "D" | "U" | "L" | "C" | "M" | "S" | "P" | "G"
/**
 * @tag 状态。H-场外办单 G-场内办单 P-计划中 M-提交未激活 N-激活 S-源位置选中 T-压车 O-装船卸岸边 C-目标位置选中 E-完成 R-拒绝
 */
type Status = "H" | "G" | "P" | "M" | "N" | "S" | "T" | "O" | "C" | "E" | "R"

// type DeviceType = "S" | "T" | "H" | "F" | "Y"
interface DeviceTypeMap {
  /**
   * @tag S 跨运车
   */
  S: "S"
  /**
   * @tag T 拖车
   */
  T: "T"
  /**
   * @tag H 手持终端
   */
  H: "H"
  /**
   * @tag F 叉车
   */
  F: "F"
  /**
   * @tag Y 叉车 | RTG
   */
  Y: "Y"
}
/**
 * @tag 设备类型 S 跨运车 T 拖车 H 手持终端 F 叉车 Y 叉车 | RTG
 */
type DeviceType = keyof DeviceTypeMap

/**
 * @tag 进港类型 Z 国际中转 O 出口 T 国内中转 D 堆存 I 进口 S 过境 R 倒箱
 */
type InaimType = "Z" | "O" | "T" | "D" | "I" | "S" | "R"

interface IGetDeviceParams {
  deviceNo: string
}

interface DamCodes {
  DamType: string
  DamCode: string
  DamRemarkCn: string
  DamRemarkEn: string
}
interface GradeIds {
  /**
   * @tag 空箱特征代码
   */
  GRADEID: string
  /**
   * @tag 空箱特征描述
   */
  DESCRIPTION: string
}

interface IDeviceStatus {
  ALLOWSIZES: string
  DEVICEMTYPE: string
  DEVICENO: string
  ISALLOWDUALCTN: string
  ISHALT: "N" | "Y"
  ISUSABLE: "N" | "Y"
  OTHERWEIGHT: string
  PAUSEREASONID: string
  UNUSABLETYPE: string
  WEIGHTCAPACITY: string
}
interface DangerInfo {
  /**
   * @tag 危品等级
   */
  DANGERLEVEL: string
  /**
   * @tag 危标等级
   */
  IMDGLEVEL: string
  /**
   * @tag 联合国危险品编号
   */
  IMDGUNNO: string
  /**
   * @tag 是否危标提示
   */
  ISALARM: "Y" | "N"
}
interface IGetContainerInfoParams {
  /**
   * @tag 泊位号
   */
  berthplanNo: string
  /**
   * @tag 箱号
   */
  cntrNoList: string
  /**
   * @tag 队列类型 R-收箱 D-提箱 U-卸船 L-装船 C-查验 M-移箱 S-翻箱/核场 P-装火车 G-卸火车
   */
  queueType: QueueType
  /**
   * @tag 岸桥设备号
   */
  qcNo: string
}
/**
 * @tag 装船查询箱返回的信息
 */
interface LContainerInfo {
  /**
   * @tag 关联的箱号，双吊
   */
  RELACONTAINERNO: string
  /**
   * @tag 队列编号
   */
  WORKQUEUENO: string
  /**
   * @tag 作业编号
   */
  WORKITEMNO: string
  /**
   * @tag 箱ID
   */
  CONTAINERID: string
  /**
   * @tag 箱号
   */
  CONTAINERNO: string
  /**
   * @tag 尺寸(英尺)
   */
  CONTAINERSIZE: string
  /**
   * @tag 高度(英尺)
   */
  CONTAINERHEIGHT: string
  /**
   * @tag 箱型
   */
  CONTAINERTYPE: string
  /**
   * @tag 空重
   */
  EMPTYFULL: string
  /**
   * @tag 运载设备
   */
  CARRYDEVICE: string
  /**
   * @tag 箱在车上的位置:M-中间 F-前 A-后（1和2为双拖架标识）
   */
  POSONTRUCK: string
  /**
   * @tag 模糊配载组ID
   */
  FUZZYGROUPID: string
  /**
   * @tag
   */
  FUZZYCELLS: string
  /**
   * @tag 总重
   */
  GROSSWEIGHT: string
  /**
   * @tag ISO代码
   */
  ISOCODE: string
  /**
   * @tag 箱短名
   */
  SNAME: string
  /**
   * @tag 源位置别名
   */
  SOURCEPOSALIASE: string
  /**
   * @tag 源位置
   */
  SOURCEPOS: string
  /**
   * @tag 当前位置
   */
  CURRENTPOS: string
  /**
   * @tag 目标位置
   */
  TARGET: string
  /**
   * @tag 卸货港
   */
  POD: string
  /**
   * @tag 工作点
   */
  WORKPOINTNO: string
  /**
   * @tag 残损代码
   */
  DAMAGECODE: string
  /**
   * @tag -状态
   */
  STATUS: string
  /**
   * @tag ---双吊关联箱号
   */
  RELACONTAINERNO: string
  /**
   * @tag ---吊具组组号
   */
  SPREADERGROUPSEQ: string
  /**
   * @tag --危标信息
   */
  IMDG1: string
  /**
   * @tag --危标信息
   */
  IMDG2: string
  /**
   * @tag --危标信息
   */
  IMDG3: string
  /**
   * @tag --是否冷藏箱
   */
  ISREEF: string
  /**
   * @tag ---是否危品箱
   */
  ISIMDG: string
  /**
   * @tag ---是否超限箱
   */
  ISOVERTOP: string
  /**
   * @tag --是否残损箱
   */
  ISDAMAGE: string
  /**
   * @tag --是否捆扎箱
   */
  ISBIND: string
}
/**
 * @tag 卸船查询箱返回的信息
 */
interface UContainerInfo {
  /**
   * @tag 是否直装直卸 "N" | "Y"
   */
  ISDIRECT: string
  /**
   * @tag 关联的箱号，双吊
   */
  RELACONTAINERNO: string
  /**
   * @tag 箱ID
   */
  CONTAINERID: string
  /**
   * @tag 作业编号
   */
  WORKITEMNO: string
  /**
   *@tag 进港类型
   */
  INAIM: string
  /**
   * @tag 箱型
   */
  CONTAINERTYPE: string
  /**
   * @tag 高度(英尺)
   */
  CONTAINERHEIGHT: string
  /**
   * @tag 是否卸船查箱
   */
  ISDISCHECKCTN: string
  /**
   * @tag 是否卸船检查封条
   */
  ISDISCHECKSEAL: string
  /**
   * @tag 卸船特殊作业要求代码
   */
  SPECIALREQUIREMENTS: string
  /**
   * @tag  箱号
   */
  CONTAINERNO: string
  /**
   * @tag 箱短名
   */
  SHORTCODE: string
  /**
   * @tag 工作点
   */
  WORKPOINTNO: string
  /**
   *  @tag 设定温度
   */
  SETUPTEMP: string
  /**
   * @tag 温度单位
   */
  TEMPTYPE: string
  /**
   * @tag 船公司铅封
   */
  VESSELCOMPANYSEALNO: string
  /**
   * @tag 船公司铅封集合
   */
  VESSELCOMPANYSEALNOLIST: string
  /**
   * @tag  海关铅封
   */
  CIQSEALNO: string
  /**
   * @tag 海关铅封集合
   */
  CIQSEALNOLIST: string
  /**
   * @tag 是否自动带出封条号
   */
  ISAUTOLISTSEALNO: string
  /**
   * @tag 前部超限(cm)
   */
  OVERFRONT: string
  /**
   * @tag 后部超限(cm)
   */
  OVERBEHIND: string
  /**
   * @tag 左部超限(cm)
   */
  OVERLEFT: string
  /**
   * @tag 右部超限(cm)
   */
  OVERRIGHT: string
  /**
   * @tag 顶部超限(cm)
   */
  OVERTOP: string
  /**
   * @tag 空重
   */
  EMPTYFULL: string
  /**
   * @tag ISO代码
   */
  ISOCODE: string
  /**
   * @tag 是否绑扎
   */
  ISBIND: string
  /**
   * @tag 是否残损
   */
  ISDAMAGE: string
  /**
   * @tag 捆绑箱序号（主箱为1，子箱从2开始且连续）
   */
  BINDSEQUENCE: string
  /**
   * @tag 残损代码
   */
  DAMAGECODE: string
  /**
   * @tag 空箱特征
   */
  GRADEID: string
  /**
   * @tag 尺寸(英尺)
   */
  CONTAINERSIZE: string
  /**
   * @tag 源位置
   */
  SOURCEPOS: string
  /**
   * @tag 目标位置
   */
  TARGET: string
  /**
   * @tag 状态
   */
  STATUS: Status
  /**
   * @tag 是否超限
   */
  ISOVERTOP: string
  /**
   * @tag 是否冷藏
   */
  ISREEF: string
  /**
   * @tag  运载设备
   */
  CARRYDEVICE: string
  /**
   * @tag 箱在车上的位置:M-中间 F-前 A-后（1和2为双拖架标识）
   */
  POSONTRUCK: string
  /**
   * @tag 是否危品
   */
  ISIMDG: string
  /**
   * @tag
   */
  ISOVERFLOW: string
  CONTAINERSHORTISO: string
  /**
   * @tag 外拖超时原因时间
   */
  TRUCKTIMEOUTREASONTIME: string
  YARDPOSITIONTYPE: string
  /**
   * @tag 作业操作方式(S-单吊单箱 D-单吊双箱 F-双吊具(作废) M-多吊具)
   */
  JOBMODEL: "S" | "D" | "F" | "M"
  /**
   * @tag 进口卸船位置
   */
  INVESSELCELL: string
  /**
   * @tag 目的位置别名
   */
  TARGETALIAS: string
  /**
   * @tag 过驳标志 Y/N
   */
  ISVESSELDIRECTLOAD: "Y" | "N" | string
  ISDISCHECKSEALL: string
  ISAUTOLISTSEALLNO: string
  ISDISCHECKSEALC: string
  ISAUTOLISTSEALCNO: string
}
interface StopParams {
  deviceNo: string
}

interface PausedParams extends StopParams {
  userName: string
}

interface IContainer {
  /**
   * @tag 是否是虚拟栏
   */
  IsVirtual: "N" | "Y" | ""
  /**
   * @tag 混装代码
   */
  MixStowNo: string
  /**
   * @tag 用于标识是否HOT
   */
  Cgroupcode: string
  /**
   * @tag 高度
   */
  Containerheight: string
  /**
   * @tag 箱号
   */
  Containerno: string
  /**
   * @tag 尺寸
   */
  Containersize: string
  /**
   * @tag 箱型
   */
  Containertype: string
  /**
   * @tag 双箱指令方向(用于装卸船指令)。F-前贝 A-后贝
   */
  Dualliftdir: "F" | "A" | ""
  /**
   * @tag 空重
   */
  Emptyfull: null | string
  /**
   * @tag 总重
   */
  Grossweight: string
  /**
   * @tag 进港类型
   */
  Inaim: null | string
  /**
   * @tag Y-指令箱 | N - 船上箱
   */
  IsShow: "Y" | "N"
  /**
   * @tag 是否检查船封
   */
  Ischeckseall: "N" | "Y"
  /**
   * @tag 当前指令是否双吊
   */
  Isdual: null | string
  Ispri: string
  /**
   * @tag 超限类型
   */
  OverType: null | string
  /**
   * @tag 配载顺序
   */
  Planseq: string
  /**
   * @tag 卸货港
   */
  Pod: string
  /**
   * @tag 装货港
   */
  Pol: string
  Readytoload: string
  /**
   * @tag 箱短名
   */
  Shortcode: string
  /**
   * @tag 颜色
   */
  ShowColor: string
  /**
   * @tag 特殊箱类型 空重、冷、危组合表达
   */
  SpecialType: string
  /**
   * @tag 状态。H-场外办单 G-场内办单 P-计划中 M-提交未激活 N-激活 S-源位置选中 T-压车 O-装船卸岸边 C-目标位置选中 E-完成 R-拒绝
   */
  Status: Status
  /**
   * @tag 目标位置
   */
  Target: null | string
  /**
   * @tag 装卸状态:REG-录入(卸船),UP-已计划(装船),DIS-已卸船,LOAD-已装船,DISLOAD-中转已装船
   */
  UlState: null | string
  /**
   * @tag  进口卸船位置/出口装船位置
   */
  Vesselcell: string
  /**
   * @tag 作业序号
   */
  Worknum: string
  Wqnum: string
}

interface IBayRowRenderIndexInfo {
  EndStack: number
  IsoTier: number
  StartStack: number
  /**
   * @tag 行名
   */
  TierName: string
}

type BayReturnType = {
  CellDiff: Record<string, string>[]
  /**
   * @tag 前贝
   */
  Customebay: string
  /**
   * @tag 贝图列, [0] - 前贝, [1] - 后贝
   */
  IsoStackLst: Array<Array<string>> | []
  /**
   * @tag 贝图行, [0] - 前贝, [1] - 后贝
   */
  IsoTierLst: Array<Array<string>> | []
  Isobay: number
  MaxIsoBay: number
  MinIsoBay: number
  PairedBay: string | null
  /**
   * @tag 队列类型 R-收箱 D-提箱 U-卸船 L-装船 C-查验 M-移箱 S-翻箱/核场 P-装火车 G-卸火车
   */
  Queuetype: QueueType
  /**
   * @tag 后贝
   */
  RefCustomebay: string
  /**
   * @tag 贝图行render起始下标
   */
  TierinfoLst: Array<Array<IBayRowRenderIndexInfo>> | []
  VesselHatchcover: Array<Array<any>>
  /**
   * @tag 船舶类型。B-大船 S-驳船
   */
  Vesseltype: "B" | "S"
  /**
   * @tag 箱
   */
  WorkiteminfoLst: Array<IContainer>
  /**
   * @tag 工作队列名称
   */
  Workqueuename: string
  /**
   * @tag 工作队列号
   */
  Workqueueno: number
  /**
   * @tag 队列类型信息
   */
  queuetypemsg: string
  typea: string
}

interface ColorData {
  FIELDSTR: string
  SHOWCOLOR: string
  SHOWFIELD: string
}

interface DeviceStatus {
  /**
   * @tag 设备编号
   */
  DEVICENO: string
  /**
   * @tag  是否暂停作业
   */
  ISHALT: "N" | "Y"
  /**
   * @tag 是否可用
   */
  ISUSABLE: "Y" | "N"
  /**
   * @tag 是否激活
   */
  ISACTIVE: "Y" | "N"
  /**
   * @tag 设备号
   */
  TERMINALNO: string
  /**
   * @tag 设备主类型
   */
  DEVICEMTYPE: DeviceType
  /**
   * @tag 登陆设备的用户名
   */
  USERNAME: string
}

interface IDeviceNotifyRes {
  DEVICENOTIFY: {
    MESSAGE: string
    TERMINALNO: string
  }[]
}

type WebsocketConnectMapData = {
  rtgworklist: {
    pageId: "rtgworklist"
    url: "/api/iGT/Rtg/RtgDataInfo"
    params: {
      TerminalNo: string
    }
  }
  deviceStatus: {
    pageId: "deviceinfo"
    url: "/api/iGT/Admin/SubscribeCommon"
    params: {
      deviceNo: string
    }
  }
  getDeviceCurrentPos: {
    pageId: string
    url: "/api/iGT/Rtg/GetDeviceCurrentPos"
    params: {
      TerminalNo: string
    }
  }
  getYardBayView: {
    pageId: string
    url: "/iGT/Rtg/GetYardBayView"
    params: {
      YardLaneNo: string
      YardBayNo: string
    }
  }
  operationPage: {
    pageId: string
    url: "/api/iGT/Qc/OperationPage"
    params: {
      QcNo: string
      Velaliase: string
      InBoundVoy: string
      OutBoundVoy: string
    }
  }
  getVesselBayWorkQueue: {
    pageId: string
    url: "/api/iGT/Hht/hhtOperation"
    params: {
      IsShowCntr: string
      QcNo: string
      QueueType: QueueType
      Velaliase: string
      WorkQueueNo: number
    }
  }
  getTruckDataInfo: {
    pageId: "trucklist"
    url: "/api/iGT/Truck/TruckDataInfo"
    params: {
      deviceNo: string
      terminalNo: string
      userName: string
    }
  }
  getDeviceMessage: {
    pageId: "devicenotify"
    url: "/api/iGT/Admin/SubscribeCommon"
    params: {
      terminalNo: string
    }
  }
  getTempList: {
    pageId: "tempList"
    url: "/api/iGT/MiscellaneousJob/TempContainerInfo"
    params: {
      OperType: string
    }
  }
}
type NotifyType = {
  date: string
  notify: string
  read: "Y" | "N"
}

type StopWorkType = {
  /**
   * @tag 停工类型
   */
  BERTHPLANHALTTYPE: string
  /**
   * @tag 停工类型中文描述
   */
  MEMO: string
  /**
   * @tag 停工类型英文描述
   */
  MEMO_E: string
  /**
   * @tag 停工代码中文描述
   */
  BERTHPLANHALTNAME: string
  /**
   * @tag 停工代码（小类）
   */
  BERTHPLANHALTCODE: string
}
