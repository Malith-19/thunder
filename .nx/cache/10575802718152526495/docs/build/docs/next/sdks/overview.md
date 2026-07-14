# SDKs Overview

export const SDKsContent = () => {
  const productName = productConfig.project.name;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const allSDKs = [
     in a new React + Vite app.`, href: '/docs/next/sdks/react/overview', category: 'frontend'},
     authentication in your Next.js application with App Router support.`, href: '/docs/next/sdks/nextjs/overview', category: 'frontend'},
     authentication.`, href: '/docs/next/sdks/express/overview', category: 'backend'},
    {icon: , title: 'Browser SDK', packageName: '@thunderid/browser', packageManager: 'npm', description: 'Vanilla JavaScript SDK for browser-based applications without frameworks.', href: '/docs/next/sdks/browser/overview', category: 'frontend'},
    {icon: , title: 'JavaScript SDK', packageName: '@thunderid/javascript', packageManager: 'npm', description: 'Framework-agnostic core library that powers browser, Node.js, and other platform-specific SDKs.', href: '/docs/next/sdks/javascript/overview', category: 'frontend'},
     SDK.`, href: '/docs/next/sdks/vue/overview', category: 'frontend'},
     authentication in your Nuxt 3 application.`, href: '/docs/next/sdks/nuxt/overview', category: 'frontend'},
    {icon: , title: 'Node.js SDK', packageName: '@thunderid/node', packageManager: 'npm', description: 'Server-side authentication for Node.js applications.', href: '/docs/next/sdks/node/overview', category: 'backend'},
    {icon: , title: 'React Router', packageName: '@thunderid/react-router', packageManager: 'npm', description: `Protect routes and handle OAuth callbacks in React Router v6 applications.`, href: '/docs/next/sdks/react-router/overview', category: 'router'},
    {icon: , title: 'TanStack Router', packageName: '@thunderid/tanstack-router', packageManager: 'npm', description: `Protect routes and handle OAuth callbacks in TanStack Router applications.`, href: '/docs/next/sdks/tanstack-router/overview', category: 'router'},
     authentication in Swift applications.`, href: '/docs/next/sdks/ios/overview', category: 'mobile'},
     authentication in Kotlin/Java applications.`, href: '/docs/next/sdks/android/overview', category: 'mobile'},
     authentication to your Angular application.`, comingSoon: true, category: 'frontend'},
     authentication SDK for Go applications.`, comingSoon: true, category: 'backend'},
     authentication in your Python applications.`, comingSoon: true, category: 'backend'},
     authentication.`, comingSoon: true, category: 'mobile'},
     authentication.`, comingSoon: true, category: 'mobile'},
  ];

  const filters = [
    ,
    ,
    ,
    ,
    ,
  ];

  const filteredSDKs = allSDKs.filter(sdk => {
    const matchesCategory = activeFilter === 'all' || sdk.category === activeFilter;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sdk.title.toLowerCase().includes(query) ||
      sdk.packageName?.toLowerCase().includes(query) ||
      sdk.description.toLowerCase().includes(query)
    );
  });

  return (
    <>


        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: ,
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            ThunderID SDKs



            Explore the official ThunderID SDKs for seamless integration of authentication
            and user management into your applications.




            <TextField
              placeholder="Search SDKs..."
              variant="outlined"
              sx=}
              size="medium"
              value=
              onChange=
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">


                  ),
                },
              }}
            />
          </Box>



            {filters.map(f => {
              const isActive = activeFilter === f.key;
              return (
                <Box
                  component="button"
                  key=
                  onClick=
                  role="tab"
                  aria-selected=
                  aria-label=`}
                  tabIndex=
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 2,
                    py: 0.75,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 400,
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'all 0.2s ease',
                    border: '1px solid',
                    borderColor: isActive ? 'primary.main' : 'divider',
                    bgcolor: isActive ? 'rgba(255, 107, 0, 0.08)' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontFamily: 'inherit',
                    '&:hover': {
                      borderColor: isActive ? 'primary.main' : 'text.secondary',
                      bgcolor: isActive ? 'rgba(255, 107, 0, 0.12)' : 'action.hover',
                    },
                  }}
                >



              );
            })}
          </Box>
        </Box>
      </Box>



        {filteredSDKs.map((sdk, index) => (
          <Grid key= size=}>


        ))}
      </Grid>

      {filteredSDKs.length === 0 && (

          <Typography variant="h6" color="text.secondary">
            No SDKs found"` : ''}


            Try a different search or filter

        </Box>
      )}


        <Typography variant="h4" sx=}>Need Help?

          Can't find the SDK you're looking for?
          <RepoLink path="/issues/new?template=feature.yml">Request a new SDK or check out
          our <a href="/docs/next/apis">API documentation</a> to build your own integration.
        </Typography>
      </Box>
    </>
  );
};
