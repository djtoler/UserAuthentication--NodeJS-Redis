'Firehose',
    'create and name vpc',
    'create ec2 and allow shh access'
    'create subnets(subrange if ipv4, aws reserves 5), private and public',
    'make cidr block for set ip number options, private should have more than public',
        'can enable auto assigning, its disabled by default but changing it in subnets will reflect in ec2',
    'enable internet connectivity by creating an internet gateway and route tables',
        'attach the internet gateway to a vpc',
        'create a public and private route table',
        'assign subnets to coorsponding route tables',
        'edit routes to allow direct local traffic and public traffic(send to IGW)',
    'Bastion Host',
        'ec2 instance that uses bastion host security group inside a public subnet',
        'send traffic to bastion host and allow bastion host to send public traffic to private subnet since theyre both inside the same vpc and have access to each other',
        'must allow internet traffic but restricted to certain ips',
    'NAT Gateway',
        'Network Address Translation',
    'AWS managed, higher bandwith, high availabily',
    'pay per hr for usage and bandwith',
    'cant be used by ec2 instance in same subnet',
    'requires an igw',
    '5gbps bandwith, autoscales up to 45 gbps',
    'no security groups to manage',
    'resilient with single AZ, must create multiple NAT gateways in multiple AZs for fault tolerance',
    '',
    '',
    'NAT Instance',
        'ec2 instances in private subnet to connet to internet',
        'must be launched in a public subnet and disable source/destination check',
        'must have elastic ip attached',
        'route tables must be configured to route traffic from private subnets for the NAT instance',
        'bandwith depends on instance type',
    'NACL',
        'traffic hits NACL before hitting subnet',
        'stateless where as security groups are stateful',
        'like firewalls that control traffic to and fom subnets',
        'define rules with numbers, lower numbers = higher priorities and can override higher numbers. ',
        'last rule is asterisk and rules should increment by 100',
        'good for blocking ips at the subnet level',
        'default nacl accepts all inbound and outboud with subnest associated',
'Ephemeral Ports',
    'for any 2 endpoint to connect, they must use a port',
'VPC Peering',
    'privatly connect 2 pcs using aws network',
    'must not have overlapping cidrs',
    'not transative, must establish connection for each vpc that needs to communicate with each other ',
    'must update rout tables in each vpc subnet to ensure ec2 instances can communicate with each other',
'VPC Endpoints',
    'interface endpoint --> provisions a eni (privateip) as an entry, cost = per hr + per gb',
    'gateway endpoint --> provisions a gateway and must be used as target in route table, supports s3 and dynamo and cost = free',
    'most times use gateway unless you require on prem access',
'VPC Flow Logs',
'capture info about IP traffic going into your interfaces --> flow logs, subnet flows, ENI flow logs',
'helps monitor and troubleshoot connectivity issues, can go to s2 or cloudwatch logs',
'captures network information from aws managed interfaces',
'Site To Site VPN',
'customer gateway device --> use public internet routable ip address or public ip address of nat device id nat traversal is enabled',
'VPN Cloudhub --> secure communication between multiple vpn connections: connect multiple VPN connections on the same VGW set up dynamic routing and configure routing tables',
'DX(Direct Connect) --> provides dedicated private connection from remote network to VPC',
'dedicated connection must be setup between DC and aws direct connect',
'must setup Virtual Private Gateway on you VPC and access public abnd private resources on same connection',
'use cases --> increase bandwith throughput, more consistent network experience, hybrid enviornments',
'Direct Connect Gateway -->> to setup DC to 1 or more VPC in many different regions, you must use a Direct Connect',
    'dedicated connections -->1gbps, 10gbps, 100gbps, physical dedicated ethernet port, request made to aws the direct connect partners',
    'hosted connections --> 50mbps, 500mbps, 10gbps, connection requests made via aws direct connect partners, capacity can be added or removed on demand with 1, 2, 5 and 10 gbps available',
    '1month+ lead time to establish connection',
    'not encrypted by default but is private, encryption requires cirect connect plus vpn',
    'to get high resillency for critical workloads --> once connection, multiple locations',
    'to get MAX resillency --> seperate connections terminating on seperate devices in more than 1 location ',
'Transit Gateway',
    'transitive peering between thousands of vpc and on prem',
'ecmp --> equal cost muti path routing: foward a packet over multiple best path',
    'usecase: ctreate site to site vpn connections',
'VPC Traffic Mirroring',
    'capture and inspect network traffic',
'source and target in same vpc or have vpc peering ',
'ipv6',
'',
'',
'',
'',
'',
''